
(function(){
 'use strict';
 const home=document.getElementById('dbc-home');
 if(!home)return;
 const alertPane=document.getElementById('dbc-home-note');
 const title=document.getElementById('dbc-home-note-title');
 const gameSheet=document.getElementById('sheet');
 const heroes=document.querySelector('[data-sheet="pieces"]');
 const openHomeBtn=document.getElementById('dbc-open-home');
 const fig=window.DBCPersonnages?.fig;
 if(fig){
   document.getElementById('dbc-preview-blue').innerHTML=fig('K','w',{dr:-1,dc:0});
   document.getElementById('dbc-preview-red').innerHTML=fig('Q','b',{dr:1,dc:0});
 }
 function showHome(){
   if(gameSheet)gameSheet.hidden=true;
   home.hidden=false;
   alertPane.hidden=true;
   document.body.classList.add('dbc-menu-active');
 }
 function leaveHome(){
   home.hidden=true;
   alertPane.hidden=true;
   document.body.classList.remove('dbc-menu-active');
 }
 home.addEventListener('click',function(ev){
   const button=ev.target.closest('[data-dbc-action]');
   if(!button)return;
   const action=button.dataset.dbcAction;
   if(action==='combat'){leaveHome();return}
   if(action==='heroes'){leaveHome();heroes?.click();return}
   if(action==='close-note'){alertPane.hidden=true;return}
   const titles={cards:'Cartes',shop:'Boutique',clans:'Clans',settings:'Paramètres'};
   if(titles[action]){
     title.textContent=titles[action]+' : fonctionnalité à venir.';
     alertPane.hidden=false;
   }
 });
 openHomeBtn?.addEventListener('click',showHome);
 showHome();
})();
