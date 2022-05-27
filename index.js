const logger = new NIL.Logger(`test`);
const path = require(`path`);
const temporary_conf = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'tmpconf.json')));
const temporary_list = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'tmplist.json')));


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
const detect_custom = config.detect_curse;


// 转移list数据（regex）
checkFile("list.json", JSON.stringify(temporary_list, null, '\t'));
const list = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'list.json')));

let curse_arr_tmp = list.curse_arr;
let curse_arr = new RegExp(curse_arr_tmp);

let sensitive_arr_tmp = list.sensitive_arr;
let sensitive_arr = new RegExp(sensitive_arr_tmp);

let curse_extensions_arr_temp = list.curse_extensions_arr;
let curse_extensions_arr = new RegExp(curse_extensions_arr_temp);

let customs_arr_tmp = list.customs_arr;
let customs_arr = new RegExp(customs_arr_tmp);


// 脏话/敏感词等回复内容
let curse_reply_arr = [`不许骂人！`,`谁在骂人🤨`,`请文明用语！`,`啊？你说啥？撤回太快没看见🤪`,`骂谁呢！`,`喂？宛平南路600号？这有个口吐芬芳的😝`,`再骂，就……就……让群主把你禁言😠`];

let sensitive_reply_arr = [`已屏蔽敏感词汇！`,`小心你被举办（`,`喂？110？这人反动！`,`政治要正确！doge🤐`];

let curse_extensions_reply_arr = [`换个词就不叫骂人了？`,`别以为我不识字！这也是脏话😣`,`啧也是脏话！`,`文明交流！`];

let customs_reply_arr = [`群主不许你这么说话！`]

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
            if(customs_arr.test(e.raw_message) == true){
                if(detect_custom == true){
                    e.recall();
                    e.reply(customs_reply_arr[Math.floor(Math.random()*customs_reply_arr.length)])
                }
            }
        })}
}
 
    
   module.exports = new example;