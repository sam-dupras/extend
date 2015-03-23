var html={_namespace:null,_NAMESPACES:{"svg":"http://www.w3.org/2000/svg","xlink":"http://www.w3.org/1999/xlink"}};html.__ce=function(name,args){if(html._namespace){var node=document.createElementNS(html._namespace,name);}else{var node=document.createElement(name);}
var append=function(node,value){if(value==undefined){return;}
else if(typeof(value)=="string"){node.appendChild(document.createTextNode(value));}
else if(typeof(value)=="object"&&typeof(value.jquery)!="undefined"){for(var j=0;j<value.length;j++)
{append(node,value[j]);}}
else if(typeof(value)=="object"&&typeof(value.nodeType)!="undefined"){node.appendChild(value);}
else if(typeof(value)=="object"&&value instanceof Array){for(var j=0;j<value.length;j++)
{append(node,value[j]);}}
else{var has_properties=false;for(var k in value){var ns=null;var dot=k.lastIndexOf(":");var v=value[k];if(dot>=0){ns=k.substr(0,dot);ns=html._NAMESPACES[ns]||ns;k=k.substr(dot+1,k.length);}
if(k=="_"||k=="_class"||k=="klass"){k="class"}
if(ns){node.setAttributeNS(ns,k,v);}
else{node.setAttribute(k,v);}
has_properties=true;}
if(!has_properties)
{node.appendChild(document.createTextNode(""+value));}}}
for(var i=0;i<args.length;i++)
{append(node,args[i]);}
return node;}
html.address=html['address']=function(){return html.__ce('address',arguments)};html.applet=html['applet']=function(){return html.__ce('applet',arguments)};html.area=html['area']=function(){return html.__ce('area',arguments)};html.a=html['a']=function(){return html.__ce('a',arguments)};html.base=html['base']=function(){return html.__ce('base',arguments)};html.basefont=html['basefont']=function(){return html.__ce('basefont',arguments)};html.big=html['big']=function(){return html.__ce('big',arguments)};html.blockquote=html['blockquote']=function(){return html.__ce('blockquote',arguments)};html.body=html['body']=function(){return html.__ce('body',arguments)};html.br=html['br']=function(){return html.__ce('br',arguments)};html.b=html['b']=function(){return html.__ce('b',arguments)};html.caption=html['caption']=function(){return html.__ce('caption',arguments)};html.center=html['center']=function(){return html.__ce('center',arguments)};html.cite=html['cite']=function(){return html.__ce('cite',arguments)};html.code=html['code']=function(){return html.__ce('code',arguments)};html.dd=html['dd']=function(){return html.__ce('dd',arguments)};html.dfn=html['dfn']=function(){return html.__ce('dfn',arguments)};html.dir=html['dir']=function(){return html.__ce('dir',arguments)};html.div=html['div']=function(){return html.__ce('div',arguments)};html.dl=html['dl']=function(){return html.__ce('dl',arguments)};html.dt=html['dt']=function(){return html.__ce('dt',arguments)};html.em=html['em']=function(){return html.__ce('em',arguments)};html.font=html['font']=function(){return html.__ce('font',arguments)};html.form=html['form']=function(){return html.__ce('form',arguments)};html.h1=html['h1']=function(){return html.__ce('h1',arguments)};html.h2=html['h2']=function(){return html.__ce('h2',arguments)};html.h3=html['h3']=function(){return html.__ce('h3',arguments)};html.h4=html['h4']=function(){return html.__ce('h4',arguments)};html.h5=html['h5']=function(){return html.__ce('h5',arguments)};html.h6=html['h6']=function(){return html.__ce('h6',arguments)};html.head=html['head']=function(){return html.__ce('head',arguments)};html.hr=html['hr']=function(){return html.__ce('hr',arguments)};html.html=html['html']=function(){return html.__ce('html',arguments)};html.img=html['img']=function(){return html.__ce('img',arguments)};html.input=html['input']=function(){return html.__ce('input',arguments)};html.isindex=html['isindex']=function(){return html.__ce('isindex',arguments)};html.i=html['i']=function(){return html.__ce('i',arguments)};html.kbd=html['kbd']=function(){return html.__ce('kbd',arguments)};html.link=html['link']=function(){return html.__ce('link',arguments)};html.li=html['li']=function(){return html.__ce('li',arguments)};html.map=html['map']=function(){return html.__ce('map',arguments)};html.menu=html['menu']=function(){return html.__ce('menu',arguments)};html.meta=html['meta']=function(){return html.__ce('meta',arguments)};html.ol=html['ol']=function(){return html.__ce('ol',arguments)};html.option=html['option']=function(){return html.__ce('option',arguments)};html.param=html['param']=function(){return html.__ce('param',arguments)};html.pre=html['pre']=function(){return html.__ce('pre',arguments)};html.p=html['p']=function(){return html.__ce('p',arguments)};html.samp=html['samp']=function(){return html.__ce('samp',arguments)};html.script=html['script']=function(){return html.__ce('script',arguments)};html.select=html['select']=function(){return html.__ce('select',arguments)};html.small=html['small']=function(){return html.__ce('small',arguments)};html.strike=html['strike']=function(){return html.__ce('strike',arguments)};html.strong=html['strong']=function(){return html.__ce('strong',arguments)};html.style=html['style']=function(){return html.__ce('style',arguments)};html.sub=html['sub']=function(){return html.__ce('sub',arguments)};html.sup=html['sup']=function(){return html.__ce('sup',arguments)};html.table=html['table']=function(){return html.__ce('table',arguments)};html.td=html['td']=function(){return html.__ce('td',arguments)};html.textarea=html['textarea']=function(){return html.__ce('textarea',arguments)};html.th=html['th']=function(){return html.__ce('th',arguments)};html.title=html['title']=function(){return html.__ce('title',arguments)};html.tr=html['tr']=function(){return html.__ce('tr',arguments)};html.tt=html['tt']=function(){return html.__ce('tt',arguments)};html.ul=html['ul']=function(){return html.__ce('ul',arguments)};html.u=html['u']=function(){return html.__ce('u',arguments)};html._var=html['var']=function(){return html.__ce('var',arguments)};html.a=html['a']=function(){return html.__ce('a',arguments)};html.abbr=html['abbr']=function(){return html.__ce('abbr',arguments)};html.acronym=html['acronym']=function(){return html.__ce('acronym',arguments)};html.address=html['address']=function(){return html.__ce('address',arguments)};html.applet=html['applet']=function(){return html.__ce('applet',arguments)};html.area=html['area']=function(){return html.__ce('area',arguments)};html.article=html['article']=function(){return html.__ce('article',arguments)};html.aside=html['aside']=function(){return html.__ce('aside',arguments)};html.audio=html['audio']=function(){return html.__ce('audio',arguments)};html.b=html['b']=function(){return html.__ce('b',arguments)};html.base=html['base']=function(){return html.__ce('base',arguments)};html.basefont=html['basefont']=function(){return html.__ce('basefont',arguments)};html.bdo=html['bdo']=function(){return html.__ce('bdo',arguments)};html.big=html['big']=function(){return html.__ce('big',arguments)};html.blockquote=html['blockquote']=function(){return html.__ce('blockquote',arguments)};html.body=html['body']=function(){return html.__ce('body',arguments)};html.br=html['br']=function(){return html.__ce('br',arguments)};html.button=html['button']=function(){return html.__ce('button',arguments)};html.canvas=html['canvas']=function(){return html.__ce('canvas',arguments)};html.caption=html['caption']=function(){return html.__ce('caption',arguments)};html.center=html['center']=function(){return html.__ce('center',arguments)};html.cite=html['cite']=function(){return html.__ce('cite',arguments)};html.code=html['code']=function(){return html.__ce('code',arguments)};html.col=html['col']=function(){return html.__ce('col',arguments)};html.colgroup=html['colgroup']=function(){return html.__ce('colgroup',arguments)};html.command=html['command']=function(){return html.__ce('command',arguments)};html.datalist=html['datalist']=function(){return html.__ce('datalist',arguments)};html.dd=html['dd']=function(){return html.__ce('dd',arguments)};html.del=html['del']=function(){return html.__ce('del',arguments)};html.details=html['details']=function(){return html.__ce('details',arguments)};html.dfn=html['dfn']=function(){return html.__ce('dfn',arguments)};html.dir=html['dir']=function(){return html.__ce('dir',arguments)};html.div=html['div']=function(){return html.__ce('div',arguments)};html.dl=html['dl']=function(){return html.__ce('dl',arguments)};html.dt=html['dt']=function(){return html.__ce('dt',arguments)};html.em=html['em']=function(){return html.__ce('em',arguments)};html.embed=html['embed']=function(){return html.__ce('embed',arguments)};html.fieldset=html['fieldset']=function(){return html.__ce('fieldset',arguments)};html.figcaption=html['figcaption']=function(){return html.__ce('figcaption',arguments)};html.figure=html['figure']=function(){return html.__ce('figure',arguments)};html.font=html['font']=function(){return html.__ce('font',arguments)};html.footer=html['footer']=function(){return html.__ce('footer',arguments)};html.form=html['form']=function(){return html.__ce('form',arguments)};html.frame=html['frame']=function(){return html.__ce('frame',arguments)};html.frameset=html['frameset']=function(){return html.__ce('frameset',arguments)};html.h1=html['h1']=function(){return html.__ce('h1',arguments)};html.head=html['head']=function(){return html.__ce('head',arguments)};html.header=html['header']=function(){return html.__ce('header',arguments)};html.hgroup=html['hgroup']=function(){return html.__ce('hgroup',arguments)};html.hr=html['hr']=function(){return html.__ce('hr',arguments)};html.html=html['html']=function(){return html.__ce('html',arguments)};html.i=html['i']=function(){return html.__ce('i',arguments)};html.iframe=html['iframe']=function(){return html.__ce('iframe',arguments)};html.img=html['img']=function(){return html.__ce('img',arguments)};html.input=html['input']=function(){return html.__ce('input',arguments)};html.ins=html['ins']=function(){return html.__ce('ins',arguments)};html.keygen=html['keygen']=function(){return html.__ce('keygen',arguments)};html.kbd=html['kbd']=function(){return html.__ce('kbd',arguments)};html.label=html['label']=function(){return html.__ce('label',arguments)};html.legend=html['legend']=function(){return html.__ce('legend',arguments)};html.li=html['li']=function(){return html.__ce('li',arguments)};html.link=html['link']=function(){return html.__ce('link',arguments)};html.map=html['map']=function(){return html.__ce('map',arguments)};html.mark=html['mark']=function(){return html.__ce('mark',arguments)};html.menu=html['menu']=function(){return html.__ce('menu',arguments)};html.meta=html['meta']=function(){return html.__ce('meta',arguments)};html.meter=html['meter']=function(){return html.__ce('meter',arguments)};html.nav=html['nav']=function(){return html.__ce('nav',arguments)};html.noframes=html['noframes']=function(){return html.__ce('noframes',arguments)};html.noscript=html['noscript']=function(){return html.__ce('noscript',arguments)};html.object=html['object']=function(){return html.__ce('object',arguments)};html.ol=html['ol']=function(){return html.__ce('ol',arguments)};html.optgroup=html['optgroup']=function(){return html.__ce('optgroup',arguments)};html.option=html['option']=function(){return html.__ce('option',arguments)};html.output=html['output']=function(){return html.__ce('output',arguments)};html.p=html['p']=function(){return html.__ce('p',arguments)};html.param=html['param']=function(){return html.__ce('param',arguments)};html.pre=html['pre']=function(){return html.__ce('pre',arguments)};html.progress=html['progress']=function(){return html.__ce('progress',arguments)};html.q=html['q']=function(){return html.__ce('q',arguments)};html.rp=html['rp']=function(){return html.__ce('rp',arguments)};html.rt=html['rt']=function(){return html.__ce('rt',arguments)};html.ruby=html['ruby']=function(){return html.__ce('ruby',arguments)};html.s=html['s']=function(){return html.__ce('s',arguments)};html.samp=html['samp']=function(){return html.__ce('samp',arguments)};html.script=html['script']=function(){return html.__ce('script',arguments)};html.section=html['section']=function(){return html.__ce('section',arguments)};html.select=html['select']=function(){return html.__ce('select',arguments)};html.small=html['small']=function(){return html.__ce('small',arguments)};html.source=html['source']=function(){return html.__ce('source',arguments)};html.span=html['span']=function(){return html.__ce('span',arguments)};html.strike=html['strike']=function(){return html.__ce('strike',arguments)};html.strong=html['strong']=function(){return html.__ce('strong',arguments)};html.style=html['style']=function(){return html.__ce('style',arguments)};html.sub=html['sub']=function(){return html.__ce('sub',arguments)};html.summary=html['summary']=function(){return html.__ce('summary',arguments)};html.sup=html['sup']=function(){return html.__ce('sup',arguments)};html.table=html['table']=function(){return html.__ce('table',arguments)};html.tbody=html['tbody']=function(){return html.__ce('tbody',arguments)};html.td=html['td']=function(){return html.__ce('td',arguments)};html.textarea=html['textarea']=function(){return html.__ce('textarea',arguments)};html.tfoot=html['tfoot']=function(){return html.__ce('tfoot',arguments)};html.th=html['th']=function(){return html.__ce('th',arguments)};html.thead=html['thead']=function(){return html.__ce('thead',arguments)};html.time=html['time']=function(){return html.__ce('time',arguments)};html.title=html['title']=function(){return html.__ce('title',arguments)};html.tr=html['tr']=function(){return html.__ce('tr',arguments)};html.tt=html['tt']=function(){return html.__ce('tt',arguments)};html.u=html['u']=function(){return html.__ce('u',arguments)};html.ul=html['ul']=function(){return html.__ce('ul',arguments)};html._var=html['var']=function(){return html.__ce('var',arguments)};html.video=html['video']=function(){return html.__ce('video',arguments)};html.wbr=html['wbr']=function(){return html.__ce('wbr',arguments)};html.xmp=html['xmp']=function(){return html.__ce('xmp',arguments)};