define(['character'], function(Character) {

    var NpcTalk = {
        "guard": [
	        "Bonjour. ",
            "Votre carte s'il vous plait. ", 
            "Laissez tomber.",
            " ",
            "I used to be like you... ",
            "...a strong-willed student... ",
            "...but then I took an arrow to the knee. "
        ],

        "king": [
	        "Help! ",
            "Help! Help! ",
            "Help! ",
            "You must find my boson ", 
            "I need to have my boson... ", 
            "...or else I won't be able to... ", 
            "...get my Nobel Prize! "
        ],

        "villagegirl": [
			"You see that? ",
		    "And that too? ",
			"And that rock over there? ",
			"You can see that because of me. ",
			"I'm Photon. "
        ],

        "villager": [
			"Nature rarer uses yellow ",
		    "Than another hue; ",
			"Saves she all of that for sunsets,-- ",
			"Prodigal of blue, ",
			"Spending scarlet like a woman, ",
			"Yellow she affords ",
			"Only scantly and selectly, ",
			"Like a lover's words. ",
			"-- Emily Dickinson  ",
			"Oh by the way, I'm Gluon."
        ],

        "agent": [
			"Hey! I'm a Z<sup>0</sup> boson. ",
		    "I'm neutral in electric charge. "
        ],

        "rick": [
			"You've found me! ",
		    "Finally someone has found me. ",
			"I thought humankind stopped looking for me. ",
			"I'm Graviton by the way. "
        ],

        "scientist": [{
			"text": [//default
				"Greetings.",
				"I am the inventor of these two potions.",
				"The red one will replenish your health points...",
				"The orange one will turn you into a firefox and make you invincible...",
				"But it only lasts for a short while.",
				"So make good use of it!",
				"Now if you'll excuse me, I need to get back to my experiments..."
			]},
			{"condition": function(game){return (game.player.invincible);},
			 "text": [
				"Did you not listen to what I said?!!",
				"the famous fire-potion only lasts a few seconds",
				"You shouldn't be wasting them talking to me…"
			]},
			{"condition": function(game){return ((game.player.getSpriteName() == "firefox")
											&& !(game.player.invincible));},
			 "text": [
				"Ha ha ha, *name*",
				"All that glitters is not gold…",
				"-sigh-",
				"Did you really think you could abuse me with your disguise?",
				"I conceived that f…, that potion.",
				"Better not use your outfit as a deterrent,",
				"The goons you'll meet will attack you whatever you look like."
			]}
			
		],

        "nyan": [
			"Am I real? ",
		    "Am I alive or am I dead? ",
			"This is a recorded message. ",
			"Don't assume that I am alive... ",
			"...just because you can read this. ",
			"What does (|alive> + |dead>)/sqrt(2) mean? "

        ],

        "beachnpc": [
			"W<sup>+</sup>? ",
			"W<sup>+</sup>? ",
			"Where are you, W<sup>+</sup>? ", 
			"Oh. Hi.",
			"Do you know where W<sup>+</sup> is? ",
			"I'm W <sup>-</sup>. "
        ],

        "forestnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "desertnpc": [
			"Woah. You are still alive. ",
		    "You might be strong. ",
			"Please bring us back to our original size. "
        ],

        "lavanpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "priest": [
			"Life is meaningless... ",
			"...without you. ",
			"...",
			" I never thought...",
			"...living with a secret...",
			"...that was never shared... ",
			"...like loving you...",
			"...would be this hard.",
			"...",
			"Let the rain fall down... ",
			"...over my head... ",
			"...and let these tears... ",
			"...be masked by the water... ",
			"...rushing over my cheeks"
        ],

        "sorcerer": [
			"You need to find the anti-sword... ",
		    "...to defeat the other monsters. "
        ],

        "octocat": [
            "Welcome to BrowserQuest!",
            "Want to see the source code?",
            'Check out <a target="_blank" href="http://github.com/particlequest/ParticleQuest">the repository on GitHub</a>'
        ],

        "coder": [
			"Please don't annihilate me. ",
		    "I don't want to fight you.",
			"I'm too heavy to move. ",
			"I'm Truth Quark. "
        ],

        "beachnpc": [
			"W<sup>+</sup>? ",
			"W<sup>+</sup>? ",
			"Where are you, W<sup>+</sup>? ", 
			"Oh. Hi.",
			"Do you know where W<sup>+</sup> is? ",
			"I'm W <sup>-</sup>. "
        ],

        "desertnpc": [
			"Woah. You are still alive. ",
		    "You might be strong. ",
			"Please bring us back to our original size. "
        ],

        "othernpc": [
            "lorem ipsum",
            "lorem ipsum"
        ]
    };

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            if(typeof NpcTalk[this.itemKind][0] === 'string'){
				this.discourse = -1;
				this.talkCount = NpcTalk[this.itemKind].length;
			}
			else{
				this.discourse = 0;
				this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
			}
            this.talkIndex = 0;
        },
        
        selectTalk: function(game){
			var change = false;
			if(this.discourse != -1){
				var found = false;
				for(var i = 1; !found && i<NpcTalk[this.itemKind].length; i++){
					if(NpcTalk[this.itemKind][i]["condition"](game)){
						if(this.discourse != i){
							change = true;
							this.discourse = i;
							this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
						}
						found = true;
					}
				}
				if(!found){
					if(this.discourse != 0){
						change = true;
						this.discourse = 0;
						this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
					}
				}
			}
			return change;
		},

        talk: function(game) {
            var msg = "";

            if(this.selectTalk(game) || (this.talkIndex > this.talkCount) ){
                this.talkIndex = 0;
            }
            if(this.talkIndex < this.talkCount) {
				if(this.discourse == -1){
					msg = NpcTalk[this.itemKind][this.talkIndex];
				}
				else{
					msg = NpcTalk[this.itemKind][this.discourse]["text"][this.talkIndex];
				}
            }
            this.talkIndex += 1;

            return msg.replace('*name*',game.player.name);
        }
    });

    return Npc;
});
