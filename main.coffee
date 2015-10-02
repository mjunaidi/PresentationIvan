#cmd:cd C:\xampp\htdocs\ftp_nyudvik\startup\ && coffee -c main.coffee
#exe:index.html


ie = do->
    v = 3
    div = document.createElement('div')
    while (div.getElementsByTagName('i').length or v is 3)
    	div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->'
    if v > 4 then v else undefined;
 

if ie < 9
	$("body").addClass("warning").html('
		You are using an old browser! 
		Enjoy this beaty by using a modern browser such as 
		<a href="http://www.google.com/chrome/">Google Chrome</a><br><br>
		<img src="imgs/html5.png" alt="html5 logo" />')
	throw new Error "Old browser"


timeout = (a,b)->	
	timeout.all ?= []
	id = setTimeout(b,a)
	timeout.all.push(id)
	{
		valueOf: -> id
		stop: -> clearTimeout(id)		
	}

interval = (a,b)->	
	interval.all ?= []
	id = setInterval(b,a)
	interval.all.push(id)
	{
		valueOf: -> id
		stop: -> clearInterval(id)		
	}


if ie is 9
	do->
		_tr = jQuery.fn.transition
		jQuery.fn.transition = ->		
			args = Array.prototype.slice.call(arguments, 0);
			if args[2] is 'snap'
				args[2] = 'linear'
			if args[0].x? or args[0].y?
				args[0].left = args[0].x
				args[0].top = args[0].y
				delete args[0].x
				delete args[0].y
				this.animate.apply(this,args)
				delete args[0].top
				delete args[0].left
			_tr.apply(this,args)	
			this
		_css = jQuery.fn.css 
		jQuery.fn.css = ->
			args = Array.prototype.slice.call(arguments, 0);
			args[0].top = args[0].y
			args[0].left = args[0].x
			delete args[0].x
			delete args[0].y
			_css.apply(this,args)


	
# RULES:
# asterisks marks waiting/on-hold
# 3 hyphens represent new slide
# doble colon means func. call followed by func. name
company = top.location.href.replace(/.*\//g, '').replace('.html', '').replace(/%20/g, ' ');
slides = """

---::IVAN
Hi*, my name is Ivan Castellanos
*******
I truly believe that #{company} would benefit from having me.
**

---
I got deep knowledge about:*

---::PHP
<?php
// Multiple frameworks: CakePHP, Yii and Zend!*
class EmployeesController extends AppController {
	public function hire($name){
		if($name === "Ivan Castellanos" && !empty($this->data))
			$this->Employee->save($this->data);
	}
}
***
 
---::JS
// JavaScript with its libraries and frameworks: jQuery, Angular, React!*
$("[name='Ivan Castellanos']").appendTo("##{company}")
**

---::COFFEE
# Coffescript!
person = new Person
person.set
	name: "Ivan"
	company: "#{company}"
**

---::GITHUB

Even this presentation is made using coffeescript and you can find it in my Github repo! 
******

---::DEVELOPER
Front-end Developer
*******************

---::IDEAS
A man of ideas********
Effective ones!
***

---
Thanks for your time!
ivanca@gmail.com


""".split("---")


$text = $("#container")

#Fixing IE bug where it doesn't keep spaces after innerHTML assiment
$text.saved = ''

$text.toString = ->
	@saved

$text.write  = (str)->
	$text.saved += str
	@append(str)
	@trigger("write")

$text.end = ->
	$text.saved = '';
	@empty()
	@trigger("end")

$text.syntax = (lang)->
	CodeMirror.runMode $text.saved, lang, @get(0)


fx =
	IVAN : ->
		$text.on "write", =>
			if /Castellanos$/.test $text
				timeout 1000, -> 
					$("body").append('<img src="imgs/ivan.jpg" id="foto">')
					$("body").append('<img src="imgs/flecha.png" id="flecha">')

					$("#foto")					
						.css({ transformOrigin: "50px 30px",x:-500,y:-500,rotate:'0deg' })
						.transition({
							rotate: '380deg',
							x: -50 ,
							y: 360 ,
						},1800,'snap');

					$("#flecha")
						.css({opacity:0})
						.delay(1900)
						.animate({opacity:1})
					
					timeout 4000, ->
						$('#flecha,#foto').transition({
		   					perspective: '500px',
							rotateX: '90deg',
							opacity:0,
							queue:false
						})

	PHP : ->
		@scriptIni()
		$text.on "write", =>								
			$text.syntax "application/x-httpd-php"

	JS : ->
		@scriptIni()
		$text.on "write", ->
			$text.syntax "text/javascript"

	COFFEE: ->
		@scriptIni()
		$text.on "write", ->
			$text.syntax "text/x-coffeescript"

	GITHUB: ->	
		$text.on "write", ->
			if /Github/.test $text
				$text.html ->
					link = '<a href="https://github.com/AltIvan/rise" id="github" target="_blank">Github</a>'
					String($text).replace /Github/ , link

	DEVELOPER: ->

		if ie is 9
			return false

		$("body").append '
			<div id="aniwrapper">
				<div id="gear_code"></div>
				<img src="imgs/brush.png" alt="brush" id="brush" />
				<section class="container">
				  <div id="cube">
				    <canvas id="canvas" class="front"></canvas>
				    <figure class="back">
				    <div id="mask">
				    	<div id="sub-mask">
							<div id="gear_b" ></div>
							<div id="gear_a" ></div>
						</div>
					</div>
				    </figure>
				    <figure class="right"></figure>
				    <figure class="left"></figure>
				  </div>
				</section>
			</div>'.replace(/\t|^\s+|\s+$/g,'')

		$text.addClass('center')

		$text.on "end", ->	
			$("#aniwrapper").remove()
			$text.removeClass('center')

		#Creating round 3D corners, AKA beveled		
		bevelPolygons = [
			["8B6234", 268, 60, 0]
			["8B6234", 275, 50, 4]
			["8B6234", 281, 40, 10]
			["8B6234", 287, 35, 17]
			["8D6436", 292, 25, 25]
			["8F683D", 296, 15, 34]
			["684A28", 296, -20, 356]
			["644725", 292, -25, 364]
			["634624", 288, -35, 371]
			["5E4221", 283, -40, 377]
			["5E4221", 278, -45, 382]
			["64441D", 273, -54, 387]
		]

		polygonsHtml = ''
		for parts in bevelPolygons
			[color, translateZ, rotateX, marginTop] = parts
			polygonsHtml += '<figure style="'
			style = "transform:rotateY( 90deg ) 
				translateZ( #{translateZ}px ) 
				rotateX(#{rotateX}deg);  
				margin-top: #{marginTop}px;  
				height: 10px;  
				background: ##{color};"
			polygonsHtml += ['-o-','-webkit-','-moz-',''].join(style)
			polygonsHtml += '"></figure>'

		$("#cube").append(polygonsHtml)

		# Grab the Canvas and Drawing Context
		canvas = $('#canvas').get(0)
		canvas.width = 398 
		canvas.height = 399
		ctx = canvas.getContext('2d');
		load = ["imgs/tv.png","imgs/back.png","imgs/landscape.png"]
		images = {}
		loaded = 0
		extension_and_dir = /\.[^.]+$|^.*\//g
		load.forEach (url)-> 
			img = new Image()
			img.onload = ()->
				images[url.replace(extension_and_dir,"")] = img
				loaded++
			img.src = url

		$text.on "write", ->
			if /Front-end$/.test $text
				playAnimation()


		playAnimation = ->
			if loaded is load.length
				$("#aniwrapper").animate({opacity:1})
				timeoff = 0
				ctx.drawImage(images.tv, 0, 0)
				timeout 1000, ->

					$.cssEase['bounce'] = 'cubic-bezier(0,0.2,0.6,0.7)';

					timeout 1200, ->
						$("#brush").addClass('leaving').transition({		
							x: timeoff+200,
							opacity:0,
							queue:false
						},800,'bounce')						

					timeout 2000, ->

						code = "engine = Engine()\nengine.start()"

						$text.animate({opacity:0},{complete:->
							$text.text('Back-end Developer')
							$text.animate({opacity:1})
						})						

						$("#cube").addClass('show-back')

						timeout 1500, ->
							$("#gear_code").css({opacity:1}).animate {right:397},
								complete:->
									for letter, index in code
										do(letter,index)->
											timeout index * 100, ->
												$("#gear_code").append(letter)
												if index is code.length - 1
													timeout 400, ->
														$("#gear_b").transition(
															{rotate:1800},15000,"linear")
														timeout 2000, ->
															$("#gear_code").animate({right:180})
							

					animation = window.animation = interval 20, ->
						if timeoff > 1000
							clearInterval(animation)
						$("#brush").not(".leaving").css({ 
							x: timeoff
						})
						timeoff += 10						
						ctx	.save()
						ctx	.beginPath()
						ctx	.moveTo(-70, 0)
						ctx	.lineTo(timeoff+100-70, 0)
						ctx	.lineTo(-256 + timeoff - 70, 512)	
						ctx	.lineTo(-70, 512)
						ctx	.closePath()
						ctx	.clip()
						ctx	.drawImage(images.landscape, 0, 0)
						ctx	.restore()
			else
				timeout 50, playAnimation

	IDEAS: ->

		$text.addClass("center")

		$("body").append '
			<div id="aniwrapper" style="opacity:1" class="yellow">
				<img id="bulb" src="imgs/idea.png" alt="bulb" />	
			</div>'

		$text.on "end", ->	
			$("#aniwrapper").remove()
			$text.removeClass('center')

		timeout 2500, ->
			dollar = Array([-32.85,-128.2],[-37.75,-128.55],[-41.6,-128.85],[-47.5,-129.05],[-55.3999,-129.15],[-59.3,-129.2],[-63.1499,-129.1],[-67.05,-128.9],[-70.9499,-128.55],[-74.8,-128.05],[-78.6499,-127.35],[-82.3999,-126.45],[-86.1499,-125.35],[-89.8,-123.95],[-93.25,-122.25],[-96.6,-120.2],[-99.6499,-117.85],[-102.3999,-115.1],[-104.75,-112],[-106.6999,-108.6],[-107.5,-104.85],[-107.8,-100.95],[-107.75,-97.05],[-107.1999,-93.25],[-106.05,-89.55],[-104.1999,-86.15],[-101.6999,-83.2],[-98.6,-80.8],[-95.1499,-79],[-91.5,-77.7],[-87.8,-76.6],[-84.05,-75.5],[-80.3,-74.5],[-76.5,-73.6],[-72.6999,-72.8],[-68.85,-72.15],[-65,-71.65],[-61.1,-71.3],[-57.25,-71.1],[-53.35,-71],[-49.4499,-71.1],[-45.55,-71.3],[-41.6999,-71.65],[-37.85,-71.6999],[-34.1,-70.6999],[-30.3999,-69.35],[-26.8999,-67.6999],[-23.6,-65.65],[-20.6499,-63.15],[-18.1499,-60.15],[-16.3,-56.75],[-15.1999,-53],[-14.75,-49.15],[-14.8999,-45.25],[-15.6499,-41.4499],[-16.75,-37.6999],[-18.1999,-34.0999],[-20.05,-30.6999],[-22.3,-27.55],[-25.05,-24.8],[-28.1499,-22.5],[-31.6,-20.6999],[-35.3,-19.4],[-39.1,-18.5999],[-42.9499,-18.15],[-46.85,-17.9],[-50.75,-17.6999],[-54.6,-17.55],[-58.5,-17.5],[-62.3999,-17.5999],[-66.3,-17.8],[-70.1499,-18.15],[-74.05,-18.65],[-77.85,-19.25],[-81.6999,-20],[-85.4499,-20.9499],[-89.1999,-22],[-92.8999,-23.25],[-96.55,-24.5999],[-100.1499,-26.15],[-61,-134.2],[-61,-130.35],[-61,-126.5],[-61,-122.7],[-61,-118.85],[-61,-115],[-61,-111.2],[-61,-107.35],[-61,-103.5],[-61,-99.65],[-61,-95.85],[-61,-92],[-61,-88.15],[-61,-84.35],[-61,-80.5],[-61,-76.65],[-61,-72.8],[-61,-69],[-61,-65.15],[-61,-61.3],[-61,-57.5],[-61,-53.65],[-61,-49.8],[-61,-45.9499],[-61,-42.15],[-61,-38.3],[-61,-34.4499],[-61,-30.65],[-61,-26.8],[-61,-22.9499],[-61,-19.0999],[-61,-15.3],[-61,-11.4499],[-61,-7.5999],[-61,-3.8],[-61,0.05])

			degree = 0.0174532925

			for data in dollar				
				html = '<span class="binary">'
				html += Number(Math.random() - 0.5 >= 0)
				html += '</span>'
				radian = (Math.random() * 360) * degree
				distance = 1.5 + (Math.round(10 * Math.random())*0.18)
				x = (Math.cos(radian) / degree) * distance
				y = (Math.sin(radian) / degree) * distance
				$("#aniwrapper").append(html)
				$bin = $(".binary").last()
				$bin.css({x:200,y:200})
				$bin.transition {x:x + 200,y:y + 200},3000
				do(data,$bin)->
					[x,y] = data
					timeout 2000, ->
						$bin.transition({x:(x + 200)*1.5,y:(y + 200)*1.48},2000)
					
			$("#aniwrapper").css({opacity:1}).transition({color:"green"},3000)

			timeout 400, ->
				$("#bulb").animate({opacity:0})

			timeout 4000, ->
				$("#aniwrapper").transition({"text-shadow":"2px 2px 1px rgba(13, 124, 13, 1),1px 1px 1px rgba(13, 124, 13, 1),1px 3px 3px rgba(13, 124, 13, 1)"},2000)

			$text.on "end", ->	
				$("#aniwrapper").remove()
				$text.removeClass('center')



	scriptIni : ->
		$text.addClass("cm-s-ambiance")
		$text.on "end", ->
			$text.removeClass("cm-s-ambiance")


active = true

# $(window).click(->
# 	interval.all?.forEach (a)-> clearInterval(a)
# 	timeout.all?.forEach (a)-> clearTimeout(a)
# 	active = false
# 	true
# )


# Recursive function "show"
show = (n)->
	
	slide = slides[n]?.trim()	
	speed = 50	
	delay = 0

	if slide is undefined
		return
	
	$text.end().off("write end")
	
	if /^::/.test slide
		action = slide.match(/[a-z]+/i)[0]
		slide = slide.substr(2+action.length).trim()
		if fx[action]() is false
			show n+1
			return

	lastIndex = slide.length - 1

	for letter, index in slide		
		if letter is '*'		
			delay += speed * 10
		do(letter, index)->
			timeout index * speed + delay, ->
				if(active)	
					if letter isnt '*'
						$text.write letter
					if index is lastIndex
						show n+1

	if slide.length is 0
		show n+1

show(0)








