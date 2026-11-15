/* Damned Bastard Chess — figurines low-poly légères, sans dépendance externe.
   Identités visuelles basées sur les fiches de Slenth, Piz, Shalan,
   Léonen, Jokash et Ritchard. Les règles du jeu restent inchangées. */
(function (global) {
  'use strict';
  const CAST = Object.freeze({
    K: { nom: 'Slenth', piece: 'Roi' },
    Q: { nom: 'Shalan', piece: 'Dame' },
    B: { nom: 'Piz', piece: 'Fou' },
    N: { nom: 'Léonen', piece: 'Cavalier' },
    R: { nom: 'Jokash', piece: 'Tour' },
    P: { nom: 'Ritchard', piece: 'Pion' }
  });
  const ink = '#20242b', skin = '#ecc5a5', shadowSkin = '#c49475';
  const poly = (points, fill) => `<polygon points="${points}" fill="${fill}" stroke="${ink}" stroke-width="1.15" stroke-linejoin="round"/>`;
  const path = (d, fill) => `<path d="${d}" fill="${fill}" stroke="${ink}" stroke-width="1.15" stroke-linejoin="round"/>`;
  const rect = (x,y,w,h,fill,rx=1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${ink}" stroke-width="1.1"/>`;
  const circle = (x,y,r,fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${ink}" stroke-width="1.05"/>`;
  function boots(left, right, light, dark) {
    return poly('37,81 48,81 46,107 32,107', dark)+poly('52,81 62,81 69,107 54,107', light)+
      poly('30,103 47,103 48,110 29,110', dark)+poly('54,103 70,103 73,110 54,110', dark);
  }
  function arms(light, dark) {
    return poly('30,49 37,53 31,79 23,76', dark)+poly('63,52 70,49 78,76 70,79', light)+
      poly('23,76 30,78 31,83 23,83', skin)+poly('70,79 78,76 80,83 72,84', shadowSkin);
  }
  function face(v, hairFront, hairBack) {
    const up = v === 'up', side = v === 'right';
    let s = up ? poly('39,20 61,20 62,49 38,49', hairBack) : poly('40,27 61,27 62,47 50,53 39,47', skin);
    if (!up) {
      s += poly('51,27 61,27 62,47 50,53', shadowSkin);
      if (side) s += rect(54,39,4,1.6,ink,0.5);
      else s += rect(42,38.5,4,1.6,ink,0.5)+rect(54,38.5,4,1.6,ink,0.5);
    }
    return s + hairFront(v);
  }
  const hairs = {
    slenth(v) {return poly('37,34 33,20 42,24 44,15 52,20 60,15 63,24 68,20 65,34 57,29 52,35 44,29', '#e7dfb5')+
        poly('40,23 46,16 52,21 61,15 65,27 55,25 48,32 43,27', '#faf0cf');},
    piz(v) {return poly('35,30 34,19 43,15 52,19 59,15 67,23 64,31 62,57 57,61 55,34', '#b75034')+
        poly('35,29 37,63 31,60 29,33', '#d76f45')+circle(31,21,8,'#d0b6be')+circle(69,21,8,'#c8aab8')+
        poly('37,22 44,16 54,21 62,19 61,32 51,27 43,33', '#e57b52');},
    shalan(v) {return poly('39,30 33,18 46,14 58,18 66,28 63,44 59,35 43,35', '#705343')+
        poly('62,17 75,20 79,30 70,34 62,29', '#624635')+
        poly('36,27 47,17 56,24 61,33 50,29 39,34', '#9a7660');},
    leonen(v) {return poly('33,30 31,17 39,21 42,12 49,20 57,12 61,21 68,17 65,33 57,27 50,32 41,27', '#10151b')+
        poly('41,20 50,15 53,23 63,18 61,29 52,26 47,32', '#303844');},
    jokash(v) {return poly('39,29 38,18 47,15 60,17 64,28 58,28 56,23 42,25', '#603b2c')+
        poly('40,22 48,17 58,19 61,26 50,25', '#8b5a40');},
    ritchard(v) {return poly('37,29 34,19 44,21 47,14 56,21 65,18 65,33 58,29 51,35 42,29', '#b05738')+
        poly('35,24 44,19 48,28 54,23 64,26 55,33 44,31', '#db8251')+
        rect(44,27,12,4,'#6b9e62',2);}
  };
  function slenth(v) {
    return boots(v,'','#3e444f','#2a2e37')+arms('#d9dadc','#a0a5ac')+
      poly('33,49 65,49 67,91 30,91','#d2d2d1')+poly('50,50 65,49 67,91 50,91','#a7a9ad')+
      poly('35,50 43,51 51,65 57,50 65,49 52,70','#f2efed')+
      poly('33,47 36,47 61,88 57,89','#2c3036')+
      face(v,hairs.slenth,'#b4a989');
  }
  function piz(v) {
    return boots(v,'','#27242e','#1f2028')+
      poly('35,49 64,49 75,99 27,99','#782d34')+
      poly('52,51 65,50 75,99 54,99','#52252d')+
      arms('#633b37','#5b252d')+
      rect(45,52,11,34,'#a8484a',2)+circle(50,62,1.4,'#dfb895')+circle(50,73,1.4,'#dfb895')+
      face(v,hairs.piz,'#8e3e30');
  }
  function shalan(v) {
    return boots(v,'','#b1273b','#862639')+
      poly('30,50 67,50 77,100 24,100','#e5e5df')+
      poly('52,53 68,53 77,100 56,100','#a8aaab')+
      poly('37,50 48,53 43,96 33,98','#f7f4e8')+
      arms('#f2f0ea','#dedbd1')+
      poly('37,52 50,60 63,51 55,67 49,72 45,66','#d7a64e')+
      poly('31,90 50,83 70,93 65,98 34,98','#ead4a2')+
      face(v,hairs.shalan,'#654838');
  }
  function leonen(v) {
    return poly('31,46 41,50 34,107 19,104','#14191f')+
      boots(v,'','#293844','#1a2730')+
      arms('#567184','#283844')+
      poly('32,50 66,50 68,89 31,89','#4e6576')+
      poly('50,50 66,50 68,89 51,89','#273b4b')+
      poly('34,57 49,55 49,86 35,86','#8da9b8')+
      poly('51,55 64,57 65,84 52,86','#647e8e')+
      poly('29,45 48,52 66,44 64,58 49,63 31,58','#121a20')+
      face(v,hairs.leonen,'#10151b');
  }
  function jokash(v) {
    return boots(v,'','#2e2524','#251d1e')+
      poly('34,50 68,51 70,93 32,93','#45332b')+
      poly('51,50 68,51 70,93 51,92','#302725')+
      poly('23,51 33,50 33,83 23,83',skin)+poly('67,50 77,51 79,83 68,83',shadowSkin)+
      poly('31,48 69,48 72,63 30,63','#4a3930')+
      poly('35,61 64,62 65,67 36,67','#8b6752')+
      circle(50,58,2.2,'#d0b187')+
      face(v,hairs.jokash,'#5d3a28');
  }
  function ritchard(v) {
    return boots(v,'','#353338','#24282d')+
      poly('31,48 68,49 79,102 59,104 53,83 45,82 37,103 22,101','#aa573b')+
      poly('54,50 68,49 79,102 60,102 53,82','#6e3a2f')+
      arms('#b86a4d','#98513b')+
      poly('39,51 52,57 63,51 56,80 44,80','#d1c1b1')+
      poly('58,70 75,67 79,72 62,76','#8ae3aa')+
      face(v,hairs.ritchard,'#9b4e34');
  }
  const RENDER={K:slenth,Q:shalan,B:piz,N:leonen,R:jokash,P:ritchard};
  function fig(type,side,faceDir,hpFraction) {
    const f=faceDir||{dr:1,dc:0};
    const v=f.dr<0?'up':f.dr>0?'down':f.dc<0?'left':'right';
    const mirror=v==='left';
    const vv=mirror?'right':v;
    const teamColor=side==='b'?'#bf4a4a':'#5aa5c1';
    const teamDark=side==='b'?'#5b262e':'#24465d';
    const pedestal=poly('22,104 50,96 79,104 50,113',teamColor)+
      poly('22,104 50,113 50,120 23,111',teamDark)+
      poly('50,113 79,104 77,111 50,120',teamDark);
    const model=RENDER[type]||slenth;
    // Pas de texte rendu dans les cases : couleur du socle seule pour distinguer les équipes.
    let inner=`<ellipse cx="51" cy="115" rx="31" ry="8" fill="rgba(0,0,0,.25)"/>`+
      `<g${mirror?' transform="translate(100 0) scale(-1 1)"':''}>${pedestal}${model(vv)}</g>`;
    if(type==='P')inner=`<g transform="translate(50 110) scale(.87) translate(-50 -110)">${inner}</g>`;
    const hp=hpFraction==null?'':`<rect x="20" y="-6" width="60" height="6" rx="3" fill="#10141b"/><rect x="22" y="-4" width="${Math.max(1,56*Math.max(0,Math.min(1,hpFraction)))}" height="2.5" rx="1.2" fill="${hpFraction>.5?'#6ff0c0':hpFraction>.25?'#f2c35b':'#ff5578'}"/>`;
    return `<svg class="fig ${side} dbc-character" viewBox="0 -8 100 138" aria-hidden="true">${inner}${hp}</svg>`;
  }
  global.DBCPersonnages={CAST,fig};
})(window);
