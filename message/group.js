const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')
join = 'Halo Member News\nIntro Dulu Ya\n- Nama:\n- Umur:\n- Askot:\nSemoga Betah'
leave = '\`\`\`Sayonaraa\`\`\`'

teks = `${join}`
let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (herman, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await herman.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await herman.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(herman.user.jid)) {
            herman.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik !menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(herman.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await herman.groupMetadata(anu.jid)
           
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = herman.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome2?nama=${encodeURI(anu_user)}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=https://telegra.ph/file/dd99b2a0b095845e2639d.jpg`)
        buttons = [

          { buttonId: `!selamatdatang`, buttonText: { displayText: "Welcome👋" }, type: 1 },

        ];

        imageMsg = (

          await herman.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${teks}`,

          footerText: "Welcome Message By Herman Chanel",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await herman.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        herman.relayWAMessage(prep);

      }

      if (anu.action == "remove" && !mem.includes(herman.user.jid)) {

        mdata = await herman.groupMetadata(anu.jid);

        num = anu.participants[0];

        let w = herman.contacts[num] || { notify: num.replace(/@.+/, "") };

        anu_user = w.vname || w.notify || num.split("@")[0];

        memeg = mdata.participants.length;

        out = `${leave}`;

        buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye2?nama=${encodeURI(anu_user)}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=https://telegra.ph/file/dd99b2a0b095845e2639d.jpg`)
            
        buttons = [

          { buttonId: `!bay`, buttonText: { displayText: "Sayonara👋" }, type: 1 },];

        imageMsg = (

          await herman.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${out}`,

          footerText: "Leave Message By Herman Chanel",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await herman.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        herman.relayWAMessage(prep);
        }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
