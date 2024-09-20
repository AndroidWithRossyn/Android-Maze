var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**
	GRADLE - KNOWLEDGE IS POWER
	***** JACOB SERVICES LLC ***
    ***** PROPRIETARY CODE *****
    @author : gradle (jacob.services@outlook.com)
	@date: 01/26/2021 14:43:00
	@version: 7.0.0
	copyright @2021
*/
	isTesting: true,

	intervalAds    : 1,     //Ads each interval for example each 3 times
    
	home_text_tint : 0xe8ebf1, //white color on buttons
	maze_bg_color  : 0x8e1ea1, //background of the maze
	path_color     : 0x1a002d, //maze path color
	wall_color     : 0xffffff, //maze color of the wall
	
	
	
	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg))
        switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;

		case 'EVENT_LEVELSTART':
			//gradle.showInter();
			break;
		case 'EVENT_LEVELSCORE':
			gradle.checkInterval() && gradle.showInter();
			break;

		case 'EVENT_LEVELFAIL':
			gradle.checkInterval() && gradle.showInter(); // <-- we check the interval if ok we show interstitial
			break;
		
		case 'SCREEN_OTHER':
			//gradle.showInter();
			break;
		
		case 'EVENT_VOLUMECHANGE':
			//gradle.showInter();
			break;
			
   		case 'btn_share': //event on button share
			gradle.event_ext('show_share');
			break;
			
		case 'MORE_GAMES': //event on button share
			gradle.event_ext('show_more');
			break;
			
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },





    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	hasRewardedAd: function(){
		return true;
	},
	
	jellimatic: function() {
		jellimaticApp.start({
			noFullScreenButton: true,

			localStorage: localStorage,
			moreGamesButtonImage: './assets/img/more_games.png',

			initialize: function() {

			},
			updateProgress(loaded) {

			},
			loadingComplete(onComplete) {
				onComplete();
			},
			startLevel(levelInfo, onComplete) {
				onComplete();
			},
			levelComplete(progress) {

			},
			showAds(type, onComplete) {
				gradle.event('SHOW_AD');
			},
			handleMoreGamesButton() {
				gradle.more();
			}
		})
	},
	
	start: function(){
		function onTouchPreventDefault(event) {
			//event.preventDefault();
		}
		document.addEventListener("touchmove", onTouchPreventDefault, false);
		document.addEventListener("touchstart", onTouchPreventDefault, false);
		
        //setTimeout(function(){sizeHandler();gradle.event_ext('hide_splash');}, 600);
    },
	pause: function(){
		console.log('gradle pause ...');
	
    },
	resume: function(){
		console.log('gradle resume ...');
	
    },

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
			jacob.do_event(val);
		}
	},

	old_ev: null,
    process: function(ev, msg){
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        if(ev=='state_game_create'){
			null != game && (game.sound.mute = !1, game.paused = !1);
			//this.triggerEvent(document.getElementById('game'), 'click');
		}
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },

	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
			gradle.pause();
		}else{
			gradle.resume();
		}
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	}
};
var oMain;
gradle.run();
