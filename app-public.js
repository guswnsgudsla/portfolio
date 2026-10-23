const projectRows=[...document.querySelectorAll('.project-row')];
const moreButton=document.querySelector('.archive-more');
let selectedFilter='all';let expanded=false;
function updateProjects(){
 const matches=projectRows.filter(row=>selectedFilter==='all'||row.dataset.company===selectedFilter);
 projectRows.forEach(row=>{row.hidden=!matches.includes(row)||(!expanded&&matches.indexOf(row)>=8);});
 document.querySelector('.project-count').textContent=`${matches.length} PROJECT${matches.length===1?'':'S'}`;
 moreButton.hidden=matches.length<=8;moreButton.setAttribute('aria-expanded',String(expanded));
 moreButton.innerHTML=expanded?'경력 목록 접기 <span>−</span>':`전체 참여 경력 보기 <span>+ ${matches.length-8}</span>`;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 selectedFilter=button.dataset.filter;expanded=false;
 document.querySelectorAll('[data-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));updateProjects();
}));
moreButton.addEventListener('click',()=>{expanded=!expanded;updateProjects();});updateProjects();
const toast=document.querySelector('.toast');let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2800);}
document.getElementById('copy-email').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText('guswnsgudsla@naver.com');showToast('이메일 주소를 복사했습니다.');}catch{showToast('이메일 주소: guswnsgudsla@naver.com');}
});
let scrollQueued=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.read-progress').style.width=`${max>0?scrollY/max*100:0}%`;scrollQueued=false;}
addEventListener('scroll',()=>{if(!scrollQueued){requestAnimationFrame(updateProgress);scrollQueued=true;}},{passive:true});addEventListener('resize',updateProgress);updateProgress();
