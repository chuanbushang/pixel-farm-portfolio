// 所有像素小画（字符画 + 调色板）

export const avatar = {
  rows: [
    '................',
    '....HHHHHHHH....',
    '..HHHHHHHHHHHH..',
    '.HHHHHHHHHHHHHH.',
    '.hhhhhhhhhhhhhh.',
    '..aasssssssdsaa.',
    '..asssssssssdsa.',
    '..sseesssseesd..',
    '..sseesssseesd..',
    '..skssssssksd...',
    '...sssmmmmssd...',
    '....sssssssd....',
    '..lcccccccccC...',
    '.lccccccccccccC.',
    '.lccccccccccccC.',
    '..CCCCCCCCCCCC..',
  ],
  palette: {
    H: '#e8b96f', // 草帽（亮）
    h: '#b98245', // 帽檐（暗）
    a: '#6b4a2a', // 鬓发
    s: '#f6c79a', // 皮肤
    d: '#e0a877', // 皮肤阴影（右侧）
    k: '#f0a0a0', // 腮红
    e: '#2e2018', // 眼睛
    m: '#b0514a', // 嘴
    l: '#6a98e0', // 衬衫高光（左侧）
    c: '#4a7fd0', // 蓝衬衫
    C: '#3a66a8', // 衬衫阴影（下摆）
  },
}

export const cloud = {
  rows: [
    '....XXXXXX........',
    '..XXXXXXXXXX......',
    '.XXXXXXXXXXXXXX...',
    'ssXXXXXXXXXXXXXXss',
  ],
  palette: { X: '#ffffff', s: '#cfe4f2' },
}

export const sun = {
  rows: [
    '...oooo...',
    '..oYYYYo..',
    '.oYYYYYYo.',
    'oYYYYYYYYo',
    'oYYYYYYYYo',
    '.oYYYYYYo.',
    '..oYYYYo..',
    '...oooo...',
  ],
  palette: { Y: '#ffd94e', o: '#f0b93a' },
}

export const crops = {
  parsnip: {
    rows: [
      '..gg....',
      '.gggg...',
      '..ww....',
      '..wwww..',
      '.wwwwww.',
      '..wwww..',
      '...ww...',
      '........',
    ],
    palette: { g: '#5da23e', w: '#f0e6c8' },
  },
  pumpkin: {
    rows: [
      '....g...',
      '..oooo..',
      '.oooooo.',
      'oooooooo',
      'oooooooo',
      '.oooooo.',
      '..oooo..',
      '........',
    ],
    palette: { g: '#4a7a2e', o: '#e07b2a' },
  },
  melon: {
    rows: [
      '........',
      '..DDDD..',
      '.DGGGGD.',
      'DGGGGGGD',
      'DGGGGGGD',
      '.DGGGGD.',
      '..DDDD..',
      '........',
    ],
    palette: { D: '#2f6b2f', G: '#7cc24a' },
  },
  starfruit: {
    rows: [
      '...y....',
      '...yy...',
      'yyyyyyy.',
      '.yyyyy..',
      '..yyyy..',
      '.yy..yy.',
      '........',
    ],
    palette: { y: '#ffd94a' },
  },
} as const

export const speaker = {
  rows: [
    '....XX....',
    '...XXXX...',
    'XXXXX.X.X.',
    'XXXXX..XX.',
    'XXXXX..XX.',
    'XXXXX.X.X.',
    '...XXXX...',
    '....XX....',
  ],
  palette: { X: '#3b2a1a' },
}

// 像素信封（联系我用）
export const envelope = {
  rows: [
    '############',
    '#wwwwwwwwww#',
    '#wxwwwwwwxw#',
    '#wwxxwwxxww#',
    '#wwwwxxwwww#',
    '#wwwwwwwwww#',
    '############',
  ],
  palette: { '#': '#3b2a1a', w: '#fff7e6', x: '#b8a88f' },
}

// 八分音符（音乐开关用）
export const note = {  rows: [
    '...####.',
    '...#..#.',
    '...#..#.',
    '...#....',
    '...#....',
    '...#....',
    '.###....',
    '####....',
    '####....',
    '.##.....',
  ],
  palette: { '#': '#3b2a1a' },
}

// 木牌上的叶子装饰
export const leaf = {
  rows: [
    'gg...',
    'ggg..',
    '.ggg.',
    '..ggg',
    '...gg',
  ],
  palette: { g: '#4f9d3a' },
}

// 标题画面底部的大朵蓬松云
export const bigCloud = {
  rows: [
    '......XXXX......XXXX..........',
    '....XXXXXXXX..XXXXXXXX........',
    '..XXXXXXXXXXXXXXXXXXXXXX......',
    '.XXXXXXXXXXXXXXXXXXXXXXXXXX...',
    'XssXXXXXXXXXXXXXXXXXXXXXXssX..',
  ],
  palette: { X: '#ffffff', s: '#cfe4f2' },
}

// 季节切换按钮的小图标
export const seasonIcons = {
  flower: {
    rows: ['..y..', '.ppp.', 'ppypp', '.ppp.', '..g..'],
    palette: { y: '#ffd94a', p: '#ff9db4', g: '#4f9d3a' },
  },
  sunSmall: {
    rows: ['.yyy.', 'yyyyy', 'yyyyy', 'yyyyy', '.yyy.'],
    palette: { y: '#ffd94a' },
  },
  autumnLeaf: {
    rows: ['..o..', '.ooo.', 'oooo.', '.ooo.', '..b..'],
    palette: { o: '#d97b2e', b: '#8a5a2e' },
  },
  snowflake: {
    rows: ['w.w.w', '.www.', 'wwwww', '.www.', 'w.w.w'],
    palette: { w: '#eaf3fb' },
  },
} as const

// ============ 地面装饰素材 ============

const flowerRows = ['..p..', '.ppp.', 'ppwpp', '.ppp.', '..g..']

export const flowerPink = {
  rows: flowerRows,
  palette: { p: '#ff9db4', w: '#fff7dd', g: '#3d8a34' },
}
export const flowerYellow = {
  rows: flowerRows,
  palette: { p: '#ffd94a', w: '#fff7dd', g: '#3d8a34' },
}
export const flowerWhite = {
  rows: flowerRows,
  palette: { p: '#f5f0e6', w: '#ffd94a', g: '#3d8a34' },
}

export const grassTuft = {
  rows: ['g.g.g.g', 'g.g.g.g', 'g.g.g.g', 'gg.g.gg', '.g.g.g.', '..g....'],
  palette: { g: '#3d8a34' },
}

export const tallGrass = {
  rows: ['g.g.g.g', 'g.g.g.g', 'g.g.g.g', 'g.g.g.g', 'g.g.g.g', 'g.g.g.g', 'gg.g.gg', '.g.g.g.', '..g....'],
  palette: { g: '#2c6e28' },
}

// 奶牛
export const cow = {
  rows: [
    '................',
    '.hh........hh...',
    '.wwwwwwwwwwww...',
    '.wweewwwweeww...',
    '.wwwwwwwwwwww...',
    '..pppppppppp....',
    '..ppnppppnpp....',
    '.wwwwwwwwwwww...',
    '.wwbbwwwwbbww...',
    '.wkkkwwwwkkkw...',
    '..w...ww...w....',
    '..w...ww...w....',
  ],
  palette: { h: '#d9c8a0', w: '#f5f0e6', k: '#d9d2c4', e: '#2e2a26', p: '#e8a0a0', n: '#8a4a3a', b: '#2e2a26' },
}

// 小鸡
export const chicken = {
  rows: [
    '...rr...',
    '..wwww..',
    '.owww...',
    '.wwkw...',
    '..www...',
    '...y....',
    '...y....',
    '..y.y...',
  ],
  palette: { r: '#d94a4a', w: '#f5f0e6', k: '#d9d2c4', o: '#e8963a', y: '#d9a03a' },
}

// 白桦树（秋叶金黄、白色树干带黑斑）
export const birchTree = {
  rows: [
    '.....kkkk.....',
    '...kkyyyykk...',
    '..kyyyyyyyyk..',
    '.kyyylllyyyyk.',
    '.kyylllllyyyk.',
    '.kyyyyllyyddk.',
    '..kyyyyyyddk..',
    '...kkyyddkk...',
    '....wwww......',
    '....wbww......',
    '....wwww......',
    '....wwbw......',
    '....wwww......',
    '....bwww......',
    '....wwww......',
    '...wwwwww.....',
  ],
  palette: { k: '#6b5a1e', y: '#e8d44a', l: '#f5e77a', d: '#c9b23a', w: '#f0ece0', b: '#3a3630' },
}

// 枫树
export const mapleTree = {
  rows: [
    '.....kkkk.....',
    '...kkooookk...',
    '..kooooooook..',
    '.koollllloook.',
    '.kolrllllrodk.',
    '.koollllroddk.',
    '..kooooooddk..',
    '...kkooddkk...',
    '.....tt.......',
    '.....tt.......',
    '.....tt.......',
    '.....tt.......',
    '....tttt......',
  ],
  palette: { k: '#7a3a15', o: '#e07b2a', l: '#f09a4a', r: '#c84a2a', d: '#b85a20', t: '#7a4a21' },
}

// 圣诞树
export const christmasTree = {
  rows: [
    '......y......',
    '.....yyy.....',
    '....kkkkk....',
    '...kgggggk...',
    '..kgglggggk..',
    '..kgggrgGGk..',
    '.kgglgggGGGk.',
    '.kgrglgbgGGk.',
    '.kgglggggGGk.',
    'kgggggggggGGk',
    'kggrgggbgGGk.',
    '.....ttt.....',
    '.....ttt.....',
    '...sssssss...',
  ],
  palette: { y: '#ffd94a', k: '#1e5a26', g: '#2f7a3a', l: '#4a9a4a', G: '#256830', r: '#d94a4a', b: '#4a8ad9', t: '#7a4a21', s: '#f5f0e6' },
}

// 农舍（主页常驻）—— 红屋顶/奶油墙/烟囱/门窗/绿地毯
export const farmhouse = {
  rows: [
    '........cc........',
    '........cc........',
    '.....rrrrrrr......',
    '....rRRRRRRRr.....',
    '...rRhRRRRhRRr....',
    '..rRRRRRRRRRRRr...',
    '..rrrrrrrrrrrrr...',
    '..wwwwwwwwwwwww...',
    '..wggwwswwwsddd...',
    '..wggwwwwwwwddd...',
    '..wwswwswwwsddd...',
    '..wwswwswwwsddd...',
    '..wwwwwwwwwwddd...',
    '..ssssssssssGGG...',
    '..bbbbbbbbbbbbb...',
  ],
  palette: {
    c: '#8a8a92', // 烟囱
    r: '#a83226', // 屋顶描边
    R: '#c94a32', // 屋顶
    h: '#e0684a', // 屋顶高光
    w: '#f0dcc0', // 墙面
    s: '#dcc4a0', // 墙面阴影
    g: '#c9d9e8', // 窗玻璃
    d: '#6b4423', // 门
    G: '#4f9d3a', // 门前绿地毯
    b: '#8a5a2e', // 基座
  },
}

// 拐棍糖
export const candyCane = {
  rows: ['..rrr.', '.rwwwr', '.rwr..', '.rw...', '.wr...', '.rw...', '.wr...', '.rw...', '.wr...'],
  palette: { r: '#d94a4a', w: '#f5f0e6' },
}

// 冬青（页面四角）
export const holly = {
  rows: ['gg..gg', 'gggggg', '.gggg.', '..rr..', '.rrrr.', '..rr..'],
  palette: { g: '#2f7a3a', r: '#d94a4a' },
}

// 蝴蝶（w 为翅膀色，由组件传入不同颜色）
export const butterfly = {
  rows: ['w.bb.w', 'wwbbww', 'wwbbww', 'w.bb.w'],
}

// 西瓜切片（夏季木牌装饰）
export const watermelon = {
  rows: ['gggggggg', 'gwwwwwwg', '.wrbwrw.', '..rrrr..'],
  palette: { g: '#2f6b2f', w: '#f0ece0', r: '#e05a4a', b: '#2e2a26' },
}

// ============ 菜单 / 页面图标 ============

// 礼物盒（作品图标，带蝴蝶结扎带）
export const gift = {
  rows: [
    '..r..r..',
    '.rr..rr.',
    '..rrrr..',
    'gggggggg',
    'gggyyggg',
    'gggyyggg',
    'gggyyggg',
    '.gggggg.',
  ],
  palette: { r: '#d94a4a', g: '#e05a6a', y: '#ffd94a' },
}

// 书本（作品）
export const book = {
  rows: [
    '.bbbbbb.',
    'bbwwwwbb',
    'bwwwwwwb',
    'bwwwwwwb',
    'bwwwwwwb',
    'bbwwwwbb',
    '.bbbbbb.',
    '........',
  ],
  palette: { b: '#8a5a2e', w: '#f5f0e6' },
}

// 信箱（联系）
export const mailbox = {
  rows: [
    '..bbbb..',
    '.bwwwwb.',
    '.bwwrwb.',
    '.bwwwwb.',
    '.bbbbbb.',
    '...bb...',
    '...bb...',
    '..bbbb..',
  ],
  palette: { b: '#8a5a2e', w: '#f5f0e6', r: '#d94a4a' },
}

// 黄色微笑笑脸（关于我）
export const smiley = {
  rows: [
    '.yyyyyy.',
    'yyyyyyyy',
    'yyeyyeyy',
    'yyyyyyyy',
    'yyyyyyyy',
    'ymyyyymy',
    '.ymmmmy.',
    '.yyyyyy.',
  ],
  palette: { y: '#ffd94a', e: '#3b2a1a', m: '#3b2a1a' },
}

// 时钟（经历）
export const clock = {
  rows: [
    '.wwwwww.',
    'wwwwwwww',
    'wwwwhwww',
    'wwwwhwww',
    'wwwwhhhw',
    'wwwwwwww',
    '.wwwwww.',
    '........',
  ],
  palette: { w: '#f5f0e6', h: '#3b2a1a' },
}

// 爱心（我喜欢的）
export const heart = {
  rows: [
    '.rr..rr.',
    'rrrrrrrr',
    'rrrrrrrr',
    'rrrrrrrr',
    '.rrrrrr.',
    '..rrrr..',
    '...rr...',
    '........',
  ],
  palette: { r: '#e05a6a' },
}

// 奖章（荣誉）
export const medal = {
  rows: [
    '.rr..rr.',
    '.rr..rr.',
    '..rrrr..',
    '..yyyy..',
    '.yyyyyy.',
    '.yyyyyy.',
    '..yyyy..',
    '........',
  ],
  palette: { r: '#d94a4a', y: '#ffd94a' },
}

// 相机（爱好-摄影）
export const camera = {
  rows: [
    '..cc....',
    '.cccccc.',
    'cccccccc',
    'ccwwwwcc',
    'ccwwwwcc',
    'cccccccc',
    '........',
  ],
  palette: { c: '#5a5a66', w: '#b9e3f7' },
}

// 音符（爱好-音乐）
export const musicNote = {
  rows: [
    '...nn...',
    '...nnn..',
    '...n.n..',
    '...n....',
    '..nn....',
    '.nnn....',
    '..n.....',
  ],
  palette: { n: '#3b2a1a' },
}

// 面具（爱好-话剧）
export const mask = {
  rows: [
    '.mmmmmm.',
    'mmmmmmmm',
    'meemmeem',
    'mmmmmmmm',
    'mmmmmmmm',
    'mwmmmmwm',
    '.mmmmmm.',
  ],
  palette: { m: '#f5f0e6', e: '#3b2a1a', w: '#3b2a1a' },
}


// 饭碗（爱好-美食）
export const bowl = {
  rows: [
    '..wwww..',
    '.wwwwww.',
    'bbbbbbbb',
    'bbbbbbbb',
    '.bbbbbb.',
    '..bbbb..',
  ],
  palette: { w: '#f5f0e6', b: '#8a5a2e' },
}

// 胶片（爱好-电影）
export const film = {
  rows: [
    'ffffffff',
    'fwwffwwf',
    'ffffffff',
    'fwwffwwf',
    'ffffffff',
  ],
  palette: { f: '#3b2a1a', w: '#f5f0e6' },
}
