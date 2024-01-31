let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/f/cloud/projekte/2303-ae30.at/ae30.website
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +50 src/components/SScarousel.tsx
badd +33 src/components/carousel.ts
badd +2 src/content/projects/tuw_ba/index.md
badd +45 src/styles/carousel.css
badd +91 src/components/SSfigure.jsx
badd +148 src/pages/\[tmpproject].astro
argglobal
%argdel
$argadd ~/f/cloud/projekte/2303-ae30.at/ae30.website/bing-carousel.jsx
edit src/components/SScarousel.tsx
argglobal
balt src/components/carousel.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
9,12fold
6,15fold
17,23fold
37,38fold
41,43fold
55,58fold
46,60fold
66,69fold
66,70fold
90,92fold
89,93fold
87,94fold
85,95fold
102,104fold
101,105fold
99,106fold
97,107fold
131,138fold
110,138fold
110,139fold
143,144fold
148,152fold
147,152fold
147,153fold
156,158fold
163,165fold
170,176fold
183,187fold
181,189fold
180,194fold
179,195fold
169,197fold
162,198fold
161,199fold
17,199fold
let &fdl = &fdl
let s:l = 147 - ((35 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 147
normal! 019|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
