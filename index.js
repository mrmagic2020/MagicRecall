const logger = new NIL.Logger(`test`);
const path = require(`path`);
const temporary_conf = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'tmpconf.json')));
// const temporary_list = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'tmplist.json')))

function checkFile(file, text) {
    if (NIL.IO.exists(path.join(__dirname, file)) == false) {
        NIL.IO.WriteTo(path.join(__dirname, file), text);
    }
}

// 转移config数据（Boolean）
checkFile("config.json", JSON.stringify(temporary_conf, null, '\t'));
const config = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'config.json')));
const detect_curse = config.detect_curse;
const detect_sensitive = config.detect_sensitive;
const detect_curse_extensions = config.detect_curse_extensions;

// 转移list数据（regex）-暂时无法实现
// checkFile("list.json", JSON.stringify(temporary_list, null, '\t'));
// const list = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'list.json')));
// let curse_extensions_arr_tmp = list.curse_extensions_arr;
// const curse_extensions_arr = new RegExp(curse_extensions_arr_tmp);

// 需要检测的正则表达式列表
// 格式：(.*)xxx(.*)|(.*)yyy(.*)
// (.*)表示"xxx""yyy"前后可以有其它字符，去掉后仅匹配单独发出的"xxx""yyy"
// "｜"表示选择，将不同的关键词用"｜"分开即可
// 更多正则表达式语法见：https://www.runoob.com/regexp/regexp-syntax.html

// 脏话屏蔽列表
let curse_arr = new RegExp(`(.*)他奶奶的(.*)|(.*)肏(.*)|(.*)操(.*)|(.*)傻逼(.*)|(.*)妈逼(.*)|(.*)贱逼(.*)|(.*)他妈的(.*)|(.*)王八蛋(.*)|(.*)狗日(.*)|(.*)混蛋(.*)|(.*)滚蛋(.*)|(.*)贱人(.*)SB(.*)|(.*)sb(.*)|(.*)JB(.*)|(.*)jb(.*)|(.*)鸡巴(.*)|(.*)fuck(.*)|(.*)bitch(.*)|(.*)fucking(.*)|(.*)fucker(.*)|(.*)asshole(.*)|(.*)bastard(.*)|(.*)damn(.*)`);

// 敏感词汇屏蔽列表
let sensitive_arr = new RegExp(`(.*)港独(.*)|(.*)香港独立(.*)|(.*)台独(.*)|(.*)台湾独立(.*)|(.*)VPN(.*)|(.*)vpn(.*)`);

// 替代脏话词汇屏蔽列表
let curse_extensions_arr = new RegExp(`(.*)焯(.*)|(.*)淦(.*)|草|(.*)艹(.*)|(.*)沃日(.*)|(.*)我日(.*)|(.*)CAO(.*)|(.*)cao(.*)|(.*)草泥马(.*)|(.*)草尼玛(.*)|(.*)md(.*)|(.*)tmd(.*)|(.*)tnnd(.*)|(.*)cnm(.*)`);

// 脏话/敏感词等回复内容
let curse_reply_arr = [`不许骂人！`,`谁在骂人🤨`,`请文明用语！`,`啊？你说啥？撤回太快没看见🤪`,`骂谁呢！`,`喂？宛平南路600号？`,`再骂，就……就……让群主把你禁言😠`]
let sensitive_reply_arr = [`已屏蔽敏感词汇！`,`小心你被举办（`,`喂？110？`,`政治要正确！doge🤐`]
let curse_extensions_reply_arr = [`换个词就不叫骂人了？`,`别以为我不识字！`,`啧也是脏话！`]

class example extends NIL.ModuleBase{
    onStart(api){
        logger.setTitle(`MagicRecall`)
        logger.info(`MagicRecall Loaded Success!`)
        api.listen('onMainMessageReceived',(e)=>{
            if(curse_arr.test(e.raw_message) == true){
                if (detect_curse == true){
                    e.recall();
                    e.reply(curse_reply_arr[Math.floor(Math.random()*curse_reply_arr.length)])
                }
            }
            if(sensitive_arr.test(e.raw_message) == true){
                if(detect_sensitive == true){
                    e.recall();
                    e.reply(sensitive_reply_arr[Math.floor(Math.random()*sensitive_reply_arr.length)])
                }
            }
            if(curse_extensions_arr.test(e.raw_message) == true){
                if(detect_curse_extensions == true){
                    e.recall();
                    e.reply(curse_extensions_reply_arr[Math.floor(Math.random()*curse_extensions_reply_arr.length)])
                }
            }
        })}
}
 
    
   module.exports = new example;