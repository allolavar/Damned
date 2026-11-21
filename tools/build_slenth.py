import trimesh as tm, numpy as np, math, json, struct, pathlib
from trimesh.transformations import translation_matrix
s=tm.Scene()
C={'skin':[238,191,155,255],'hair':[237,203,131,255],'light':[255,227,166,255],'shirt':[214,208,197,255],'pants':[54,51,64,255],'leather':[90,56,45,255],'gold':[214,164,74,255],'red':[163,54,51,255],'amber':[237,153,45,255],'gray':[105,120,133,255],'dark':[40,37,41,255]}
def add(n,mesh,xyz=(0,0,0),color='shirt',parent='world'):
 mesh.visual.vertex_colors=np.tile(C[color],(len(mesh.vertices),1))
 s.add_geometry(mesh,geom_name=n,node_name=n,parent_node_name=parent,transform=translation_matrix(xyz))
def box(n,size,xyz,color='shirt',parent='world'):add(n,tm.creation.box(extents=size),xyz,color,parent)
def ball(n,size,xyz,color='shirt',parent='world'):
 m=tm.creation.icosphere(subdivisions=1);m.apply_scale(size);add(n,m,xyz,color,parent)
box('torso',(1,.5,.9),(0,0,2.15))
box('hips',(.72,.5,.35),(0,0,1.57),'pants')
box('belt',(1,.57,.15),(0,-.03,1.68),'leather')
box('buckle',(.2,.07,.18),(0,-.33,1.68),'gold')
box('sash',(.19,.12,.68),(.34,-.32,1.36),'red')
box('neck',(.25,.25,.2),(0,0,2.68),'skin')
ball('head',(.46,.38,.49),(0,-.02,3.06),'skin')
for sign in (-1,1):
 ball('ear'+str(sign),(.10,.11,.14),(.46*sign,0,3.04),'skin')
 box('eye'+str(sign),(.15,.045,.10),(.17*sign,-.38,3.08),'amber' if sign==1 else 'gray')
 box('brow'+str(sign),(.18,.045,.04),(.17*sign,-.39,3.19),'dark')
box('scar',(.035,.025,.22),(-.17,-.405,2.92),'red')
box('scar_cross',(.16,.025,.035),(-.17,-.407,2.94),'red')
ball('haircap',(.51,.44,.28),(0,.01,3.43),'hair')
for i,(x,y,z) in enumerate([(-.36,-.22,3.46),(-.13,-.33,3.49),(.12,-.32,3.48),(.36,-.20,3.45),(-.43,.07,3.36),(.43,.08,3.36),(-.20,.15,3.59),(.18,.18,3.59)]):
 ball('hair'+str(i),(.20,.22,.19),(x,y,z),'light' if i%3==0 else 'hair')
for name,sign in [('L',-1),('R',1)]:
 box('armPivot'+name,(.001,.001,.001),(.58*sign,0,2.48))
 ball('sleeve'+name,(.22,.24,.27),(0,0,-.19),'shirt','armPivot'+name)
 box('forearm'+name,(.29,.28,.46),(0,0,-.54),'skin','armPivot'+name)
 box('glove'+name,(.32,.31,.25),(0,0,-.76),'leather','armPivot'+name)
 box('legPivot'+name,(.001,.001,.001),(.22*sign,0,1.46),'pants')
 box('leg'+name,(.34,.39,.74),(0,0,-.38),'pants','legPivot'+name)
 box('boot'+name,(.38,.48,.53),(0,-.05,-.97),'leather','legPivot'+name)
 box('toe'+name,(.4,.28,.17),(0,-.30,-1.16),'leather','legPivot'+name)
box('sword_grip',(.12,.14,.52),(.39,.27,2.75),'leather')
box('sword_sheath',(.16,.16,.9),(.39,.28,2.12),'leather')
raw=s.export(file_type='glb');off=12;chunks=[]
while off<len(raw):
 length,kind=struct.unpack_from('<I4s',raw,off);off+=8;chunks.append((kind,raw[off:off+length]));off+=length
j=json.loads(chunks[0][1].decode().rstrip(' '));binary=bytearray(chunks[1][1])
names={n['name']:i for i,n in enumerate(j['nodes']) if 'name' in n}
def accessor(vals,typ):
 while len(binary)%4:binary.append(0)
 a=np.asarray(vals,dtype='<f4');start=len(binary);binary.extend(a.tobytes())
 v=len(j['bufferViews']);j['bufferViews'].append({'buffer':0,'byteOffset':start,'byteLength':a.nbytes})
 k=len(j['accessors']);d={'bufferView':v,'componentType':5126,'count':a.size if typ=='SCALAR' else a.shape[0],'type':typ}
 if typ=='SCALAR':d.update(min=[float(a.min())],max=[float(a.max())])
 j['accessors'].append(d);return k
def anim(name,duration,parts):
 time=accessor([0,duration*.25,duration*.5,duration*.75,duration],'SCALAR');samplers=[];channels=[]
 for node,angles in parts:
  quats=[[math.sin(a/2),0,0,math.cos(a/2)] for a in angles]
  k=len(samplers);samplers.append({'input':time,'output':accessor(quats,'VEC4'),'interpolation':'LINEAR'})
  channels.append({'sampler':k,'target':{'node':names[node],'path':'rotation'}})
 j['animations'].append({'name':name,'samplers':samplers,'channels':channels})
j['animations']=[]
anim('Idle',2,[('armPivotL',[0,.07,0,-.07,0]),('armPivotR',[0,-.07,0,.07,0])])
anim('Walk',.8,[('armPivotL',[-.4,0,.4,0,-.4]),('armPivotR',[.4,0,-.4,0,.4]),('legPivotL',[.48,0,-.48,0,.48]),('legPivotR',[-.48,0,.48,0,-.48])])
anim('Attack',.65,[('armPivotR',[0,-1.6,-2.4,.6,0]),('armPivotL',[0,-.2,-.4,0,0])])
anim('Hit',.45,[('armPivotL',[0,.5,.7,.2,0]),('armPivotR',[0,.5,.7,.2,0])])
anim('Death',1.1,[('legPivotL',[0,-.1,-.4,-1.1,-1.4]),('legPivotR',[0,.2,.4,.7,.9]),('armPivotL',[0,.2,.8,1.1,1.2]),('armPivotR',[0,-.2,-.8,-1.1,-1.2])])
j['buffers'][0]['byteLength']=len(binary)
def chunk(data,kind):
 data+= (b' ' if kind==b'JSON' else b'\x00')*((-len(data))%4)
 return struct.pack('<I4s',len(data),kind)+data
payload=chunk(json.dumps(j,separators=(',',':')).encode(),b'JSON')+chunk(bytes(binary),b'BIN\x00')
out=struct.pack('<III',0x46546c67,2,12+len(payload))+payload
path=pathlib.Path('prototype/assets/slenth_rigged_v1.glb');path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(out)
print('Generated',path,len(out),'bytes; animations:',[a['name'] for a in j['animations']])
