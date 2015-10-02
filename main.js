// Generated by CoffeeScript 1.10.0
var $text, active, company, fx, ie, interval, show, slides, timeout;

ie = (function() {
  var div, v;
  v = 3;
  div = document.createElement('div');
  while (div.getElementsByTagName('i').length || v === 3) {
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
  }
  if (v > 4) {
    return v;
  } else {
    return void 0;
  }
})();

if (ie < 9) {
  $("body").addClass("warning").html('You are using an old browser! Enjoy this beaty by using a modern browser such as <a href="http://www.google.com/chrome/">Google Chrome</a><br><br> <img src="imgs/html5.png" alt="html5 logo" />');
  throw new Error("Old browser");
}

timeout = function(a, b) {
  var id;
  if (timeout.all == null) {
    timeout.all = [];
  }
  id = setTimeout(b, a);
  timeout.all.push(id);
  return {
    valueOf: function() {
      return id;
    },
    stop: function() {
      return clearTimeout(id);
    }
  };
};

interval = function(a, b) {
  var id;
  if (interval.all == null) {
    interval.all = [];
  }
  id = setInterval(b, a);
  interval.all.push(id);
  return {
    valueOf: function() {
      return id;
    },
    stop: function() {
      return clearInterval(id);
    }
  };
};

if (ie === 9) {
  (function() {
    var _css, _tr;
    _tr = jQuery.fn.transition;
    jQuery.fn.transition = function() {
      var args;
      args = Array.prototype.slice.call(arguments, 0);
      if (args[2] === 'snap') {
        args[2] = 'linear';
      }
      if ((args[0].x != null) || (args[0].y != null)) {
        args[0].left = args[0].x;
        args[0].top = args[0].y;
        delete args[0].x;
        delete args[0].y;
        this.animate.apply(this, args);
        delete args[0].top;
        delete args[0].left;
      }
      _tr.apply(this, args);
      return this;
    };
    _css = jQuery.fn.css;
    return jQuery.fn.css = function() {
      var args;
      args = Array.prototype.slice.call(arguments, 0);
      args[0].top = args[0].y;
      args[0].left = args[0].x;
      delete args[0].x;
      delete args[0].y;
      return _css.apply(this, args);
    };
  })();
}

company = top.location.href.replace(/.*\//g, '').replace('.html', '').replace(/%20/g, ' ');

slides = ("\n---::IVAN\nHi*, my name is Ivan Castellanos\n*******\nI truly believe that " + company + " would benefit from having me.\n**\n\n---\nI got deep knowledge about:*\n\n---::PHP\n<?php\n// Multiple frameworks: CakePHP, Yii and Zend!*\nclass EmployeesController extends AppController {\n	public function hire($name){\n		if($name === \"Ivan Castellanos\" && !empty($this->data))\n			$this->Employee->save($this->data);\n	}\n}\n***\n \n---::JS\n// JavaScript with its libraries and frameworks: jQuery, Angular, React!*\n$(\"[name='Ivan Castellanos']\").appendTo(\"#" + company + "\")\n**\n\n---::COFFEE\n# Coffescript!\nperson = new Person\nperson.set\n	name: \"Ivan\"\n	company: \"" + company + "\"\n**\n\n---::GITHUB\n\nEven this presentation is made using coffeescript and you can find it in my Github repo! \n******\n\n---::DEVELOPER\nFront-end Developer\n*******************\n\n---::IDEAS\nA man of ideas********\nEffective ones!\n***\n\n---\nThanks for your time!\nivanca@gmail.com\n\n").split("---");

$text = $("#container");

$text.saved = '';

$text.toString = function() {
  return this.saved;
};

$text.write = function(str) {
  $text.saved += str;
  this.append(str);
  return this.trigger("write");
};

$text.end = function() {
  $text.saved = '';
  this.empty();
  return this.trigger("end");
};

$text.syntax = function(lang) {
  return CodeMirror.runMode($text.saved, lang, this.get(0));
};

fx = {
  IVAN: function() {
    return $text.on("write", (function(_this) {
      return function() {
        if (/Castellanos$/.test($text)) {
          return timeout(1000, function() {
            $("body").append('<img src="imgs/ivan.jpg" id="foto">');
            $("body").append('<img src="imgs/flecha.png" id="flecha">');
            $("#foto").css({
              transformOrigin: "50px 30px",
              x: -500,
              y: -500,
              rotate: '0deg'
            }).transition({
              rotate: '380deg',
              x: -50,
              y: 360
            }, 1800, 'snap');
            $("#flecha").css({
              opacity: 0
            }).delay(1900).animate({
              opacity: 1
            });
            return timeout(4000, function() {
              return $('#flecha,#foto').transition({
                perspective: '500px',
                rotateX: '90deg',
                opacity: 0,
                queue: false
              });
            });
          });
        }
      };
    })(this));
  },
  PHP: function() {
    this.scriptIni();
    return $text.on("write", (function(_this) {
      return function() {
        return $text.syntax("application/x-httpd-php");
      };
    })(this));
  },
  JS: function() {
    this.scriptIni();
    return $text.on("write", function() {
      return $text.syntax("text/javascript");
    });
  },
  COFFEE: function() {
    this.scriptIni();
    return $text.on("write", function() {
      return $text.syntax("text/x-coffeescript");
    });
  },
  GITHUB: function() {
    return $text.on("write", function() {
      if (/Github/.test($text)) {
        return $text.html(function() {
          var link;
          link = '<a href="https://github.com/AltIvan/rise" id="github" target="_blank">Github</a>';
          return String($text).replace(/Github/, link);
        });
      }
    });
  },
  DEVELOPER: function() {
    var bevelPolygons, canvas, color, ctx, extension_and_dir, i, images, len, load, loaded, marginTop, parts, playAnimation, polygonsHtml, rotateX, style, translateZ;
    if (ie === 9) {
      return false;
    }
    $("body").append('<div id="aniwrapper"> <div id="gear_code"></div> <img src="imgs/brush.png" alt="brush" id="brush" /> <section class="container"> <div id="cube"> <canvas id="canvas" class="front"></canvas> <figure class="back"> <div id="mask"> <div id="sub-mask"> <div id="gear_b" ></div> <div id="gear_a" ></div> </div> </div> </figure> <figure class="right"></figure> <figure class="left"></figure> </div> </section> </div>'.replace(/\t|^\s+|\s+$/g, ''));
    $text.addClass('center');
    $text.on("end", function() {
      $("#aniwrapper").remove();
      return $text.removeClass('center');
    });
    bevelPolygons = [["8B6234", 268, 60, 0], ["8B6234", 275, 50, 4], ["8B6234", 281, 40, 10], ["8B6234", 287, 35, 17], ["8D6436", 292, 25, 25], ["8F683D", 296, 15, 34], ["684A28", 296, -20, 356], ["644725", 292, -25, 364], ["634624", 288, -35, 371], ["5E4221", 283, -40, 377], ["5E4221", 278, -45, 382], ["64441D", 273, -54, 387]];
    polygonsHtml = '';
    for (i = 0, len = bevelPolygons.length; i < len; i++) {
      parts = bevelPolygons[i];
      color = parts[0], translateZ = parts[1], rotateX = parts[2], marginTop = parts[3];
      polygonsHtml += '<figure style="';
      style = "transform:rotateY( 90deg ) translateZ( " + translateZ + "px ) rotateX(" + rotateX + "deg); margin-top: " + marginTop + "px; height: 10px; background: #" + color + ";";
      polygonsHtml += ['-o-', '-webkit-', '-moz-', ''].join(style);
      polygonsHtml += '"></figure>';
    }
    $("#cube").append(polygonsHtml);
    canvas = $('#canvas').get(0);
    canvas.width = 398;
    canvas.height = 399;
    ctx = canvas.getContext('2d');
    load = ["imgs/tv.png", "imgs/back.png", "imgs/landscape.png"];
    images = {};
    loaded = 0;
    extension_and_dir = /\.[^.]+$|^.*\//g;
    load.forEach(function(url) {
      var img;
      img = new Image();
      img.onload = function() {
        images[url.replace(extension_and_dir, "")] = img;
        return loaded++;
      };
      return img.src = url;
    });
    $text.on("write", function() {
      if (/Front-end$/.test($text)) {
        return playAnimation();
      }
    });
    return playAnimation = function() {
      var timeoff;
      if (loaded === load.length) {
        $("#aniwrapper").animate({
          opacity: 1
        });
        timeoff = 0;
        ctx.drawImage(images.tv, 0, 0);
        return timeout(1000, function() {
          var animation;
          $.cssEase['bounce'] = 'cubic-bezier(0,0.2,0.6,0.7)';
          timeout(1200, function() {
            return $("#brush").addClass('leaving').transition({
              x: timeoff + 200,
              opacity: 0,
              queue: false
            }, 800, 'bounce');
          });
          timeout(2000, function() {
            var code;
            code = "engine = Engine()\nengine.start()";
            $text.animate({
              opacity: 0
            }, {
              complete: function() {
                $text.text('Back-end Developer');
                return $text.animate({
                  opacity: 1
                });
              }
            });
            $("#cube").addClass('show-back');
            return timeout(1500, function() {
              return $("#gear_code").css({
                opacity: 1
              }).animate({
                right: 397
              }, {
                complete: function() {
                  var index, j, len1, letter, results;
                  results = [];
                  for (index = j = 0, len1 = code.length; j < len1; index = ++j) {
                    letter = code[index];
                    results.push((function(letter, index) {
                      return timeout(index * 100, function() {
                        $("#gear_code").append(letter);
                        if (index === code.length - 1) {
                          return timeout(400, function() {
                            $("#gear_b").transition({
                              rotate: 1800
                            }, 15000, "linear");
                            return timeout(2000, function() {
                              return $("#gear_code").animate({
                                right: 180
                              });
                            });
                          });
                        }
                      });
                    })(letter, index));
                  }
                  return results;
                }
              });
            });
          });
          return animation = window.animation = interval(20, function() {
            if (timeoff > 1000) {
              clearInterval(animation);
            }
            $("#brush").not(".leaving").css({
              x: timeoff
            });
            timeoff += 10;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(-70, 0);
            ctx.lineTo(timeoff + 100 - 70, 0);
            ctx.lineTo(-256 + timeoff - 70, 512);
            ctx.lineTo(-70, 512);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(images.landscape, 0, 0);
            return ctx.restore();
          });
        });
      } else {
        return timeout(50, playAnimation);
      }
    };
  },
  IDEAS: function() {
    $text.addClass("center");
    $("body").append('<div id="aniwrapper" style="opacity:1" class="yellow"> <img id="bulb" src="imgs/idea.png" alt="bulb" /> </div>');
    $text.on("end", function() {
      $("#aniwrapper").remove();
      return $text.removeClass('center');
    });
    return timeout(2500, function() {
      var $bin, data, degree, distance, dollar, fn, html, i, len, radian, x, y;
      dollar = Array([-32.85, -128.2], [-37.75, -128.55], [-41.6, -128.85], [-47.5, -129.05], [-55.3999, -129.15], [-59.3, -129.2], [-63.1499, -129.1], [-67.05, -128.9], [-70.9499, -128.55], [-74.8, -128.05], [-78.6499, -127.35], [-82.3999, -126.45], [-86.1499, -125.35], [-89.8, -123.95], [-93.25, -122.25], [-96.6, -120.2], [-99.6499, -117.85], [-102.3999, -115.1], [-104.75, -112], [-106.6999, -108.6], [-107.5, -104.85], [-107.8, -100.95], [-107.75, -97.05], [-107.1999, -93.25], [-106.05, -89.55], [-104.1999, -86.15], [-101.6999, -83.2], [-98.6, -80.8], [-95.1499, -79], [-91.5, -77.7], [-87.8, -76.6], [-84.05, -75.5], [-80.3, -74.5], [-76.5, -73.6], [-72.6999, -72.8], [-68.85, -72.15], [-65, -71.65], [-61.1, -71.3], [-57.25, -71.1], [-53.35, -71], [-49.4499, -71.1], [-45.55, -71.3], [-41.6999, -71.65], [-37.85, -71.6999], [-34.1, -70.6999], [-30.3999, -69.35], [-26.8999, -67.6999], [-23.6, -65.65], [-20.6499, -63.15], [-18.1499, -60.15], [-16.3, -56.75], [-15.1999, -53], [-14.75, -49.15], [-14.8999, -45.25], [-15.6499, -41.4499], [-16.75, -37.6999], [-18.1999, -34.0999], [-20.05, -30.6999], [-22.3, -27.55], [-25.05, -24.8], [-28.1499, -22.5], [-31.6, -20.6999], [-35.3, -19.4], [-39.1, -18.5999], [-42.9499, -18.15], [-46.85, -17.9], [-50.75, -17.6999], [-54.6, -17.55], [-58.5, -17.5], [-62.3999, -17.5999], [-66.3, -17.8], [-70.1499, -18.15], [-74.05, -18.65], [-77.85, -19.25], [-81.6999, -20], [-85.4499, -20.9499], [-89.1999, -22], [-92.8999, -23.25], [-96.55, -24.5999], [-100.1499, -26.15], [-61, -134.2], [-61, -130.35], [-61, -126.5], [-61, -122.7], [-61, -118.85], [-61, -115], [-61, -111.2], [-61, -107.35], [-61, -103.5], [-61, -99.65], [-61, -95.85], [-61, -92], [-61, -88.15], [-61, -84.35], [-61, -80.5], [-61, -76.65], [-61, -72.8], [-61, -69], [-61, -65.15], [-61, -61.3], [-61, -57.5], [-61, -53.65], [-61, -49.8], [-61, -45.9499], [-61, -42.15], [-61, -38.3], [-61, -34.4499], [-61, -30.65], [-61, -26.8], [-61, -22.9499], [-61, -19.0999], [-61, -15.3], [-61, -11.4499], [-61, -7.5999], [-61, -3.8], [-61, 0.05]);
      degree = 0.0174532925;
      fn = function(data, $bin) {
        var x, y;
        x = data[0], y = data[1];
        return timeout(2000, function() {
          return $bin.transition({
            x: (x + 200) * 1.5,
            y: (y + 200) * 1.48
          }, 2000);
        });
      };
      for (i = 0, len = dollar.length; i < len; i++) {
        data = dollar[i];
        html = '<span class="binary">';
        html += Number(Math.random() - 0.5 >= 0);
        html += '</span>';
        radian = (Math.random() * 360) * degree;
        distance = 1.5 + (Math.round(10 * Math.random()) * 0.18);
        x = (Math.cos(radian) / degree) * distance;
        y = (Math.sin(radian) / degree) * distance;
        $("#aniwrapper").append(html);
        $bin = $(".binary").last();
        $bin.css({
          x: 200,
          y: 200
        });
        $bin.transition({
          x: x + 200,
          y: y + 200
        }, 3000);
        fn(data, $bin);
      }
      $("#aniwrapper").css({
        opacity: 1
      }).transition({
        color: "green"
      }, 3000);
      timeout(400, function() {
        return $("#bulb").animate({
          opacity: 0
        });
      });
      timeout(4000, function() {
        return $("#aniwrapper").transition({
          "text-shadow": "2px 2px 1px rgba(13, 124, 13, 1),1px 1px 1px rgba(13, 124, 13, 1),1px 3px 3px rgba(13, 124, 13, 1)"
        }, 2000);
      });
      return $text.on("end", function() {
        $("#aniwrapper").remove();
        return $text.removeClass('center');
      });
    });
  },
  scriptIni: function() {
    $text.addClass("cm-s-ambiance");
    return $text.on("end", function() {
      return $text.removeClass("cm-s-ambiance");
    });
  }
};

active = true;

show = function(n) {
  var action, delay, fn, i, index, lastIndex, len, letter, ref, slide, speed;
  slide = (ref = slides[n]) != null ? ref.trim() : void 0;
  speed = 50;
  delay = 0;
  if (slide === void 0) {
    return;
  }
  $text.end().off("write end");
  if (/^::/.test(slide)) {
    action = slide.match(/[a-z]+/i)[0];
    slide = slide.substr(2 + action.length).trim();
    if (fx[action]() === false) {
      show(n + 1);
      return;
    }
  }
  lastIndex = slide.length - 1;
  fn = function(letter, index) {
    return timeout(index * speed + delay, function() {
      if (active) {
        if (letter !== '*') {
          $text.write(letter);
        }
        if (index === lastIndex) {
          return show(n + 1);
        }
      }
    });
  };
  for (index = i = 0, len = slide.length; i < len; index = ++i) {
    letter = slide[index];
    if (letter === '*') {
      delay += speed * 10;
    }
    fn(letter, index);
  }
  if (slide.length === 0) {
    return show(n + 1);
  }
};

show(0);
