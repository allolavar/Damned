/* 3D character layer for Damned Bastard Chess.
   Uses the rigged GLB when prototype/assets/slenth_rigged_v1.glb exists.
   Keeps the existing SVG renderer as a fallback while loading or on unsupported devices. */
(function(){
 'use strict';
 const MODEL='assets/slenth_rigged_v1.glb';
 const CDN='https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
 const LOADER='https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';
 let engine=null,loading=null,model=null,failed=false,scene,camera,renderer,mixer,clock,animations={};
 const host=document.createElement('div');host.id='dbc-3d-hero';host.setAttribute('aria-hidden','true');
 const style=document.createElement('style');
 style.textContent='#dbc-3d-hero{position:fixed;left:-10000px;top:0;width:120px;height:150px;pointer-events:none} .dbc-3d-pawn{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}.dbc-3d-pawn:not([src]){display:none}';
 document.head.appendChild(style);document.body.appendChild(host);
 async function load(){
   if(failed)return null;if(model)return model;if(loading)return loading;
   loading=(async()=>{
     const probe=await fetch(MODEL,{method:'HEAD'});if(!probe.ok)throw Error('GLB absent');
     const THREE=await import(CDN);
     // GLTFLoader expects a bare three import; use an import map on the host page if supported.
     const {GLTFLoader}=await import(LOADER);
     engine=THREE;const loader=new GLTFLoader();
     const gltf=await loader.loadAsync(MODEL);model=gltf;
     scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(35,1,0.01,100);
     camera.up.set(0,0,1);camera.position.set(5,-7,5);camera.lookAt(0,0,1.8);
     scene.add(new THREE.HemisphereLight(0xffffff,0x4d5470,2.1));
     const sun=new THREE.DirectionalLight(0xffe8c4,2.2);sun.position.set(-3,8,5);scene.add(sun);
     scene.add(gltf.scene);gltf.scene.scale.setScalar(.9);
     mixer=new THREE.AnimationMixer(gltf.scene);
     for(const clip of gltf.animations)animations[clip.name.toLowerCase()]=clip;
     renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});
     renderer.setSize(180,180);renderer.setPixelRatio(Math.min(2,devicePixelRatio||1));
     host.appendChild(renderer.domElement);clock=new THREE.Clock();
     return gltf;
   })().catch(err=>{failed=true;console.info('Damned Bastard: SVG fallback active',err.message);return null});
   return loading;
 }
 async function frame(pose='idle'){
   if(!await load())return null;
   mixer.stopAllAction();
   const key=Object.keys(animations).find(x=>x.includes(pose))||Object.keys(animations)[0];
   if(key)mixer.clipAction(animations[key]).reset().play();
   mixer.update(.25);renderer.render(scene,camera);
   return renderer.domElement.toDataURL('image/png');
 }
 async function decorate(){
   const pawns=[...document.querySelectorAll('.sq[data-hero="slenth"]')];
   if(!pawns.length)return;
   const src=await frame('idle');if(!src)return;
   for(const el of pawns){if(!el.isConnected)continue;let img=el.querySelector('.dbc-3d-pawn');
     if(!img){img=document.createElement('img');img.className='dbc-3d-pawn';img.alt='';el.querySelector('.up')?.appendChild(img)}
     img.src=src;
   }
 }
 let pending=false;
 const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;decorate()})});
 const board=document.getElementById('board');if(board)observer.observe(board,{childList:true});
 window.DBC3D={load,frame,decorate,modelPath:MODEL};
})();
