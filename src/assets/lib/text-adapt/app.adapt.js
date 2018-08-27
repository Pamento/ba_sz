var SrvOptions = {
  NULL: 0,
  SYL: 1,
  PHON: 2,
  BOTH: 3
};

function LireCouleurFormat() {
  this.correspondances = {
    verb_3p: "phon_muet",
    "#": "phon_muet",
    q_caduc: "phon_e",
    a: "phon_a",
    q: "phon_e",
    i: "phon_i",
    o: "phon_o",
    o_comp: "phon_o",
    o_ouvert: "phon_o",
    u: "phon_ou",
    y: "phon_u",
    e: "phon_ez",
    e_comp: "phon_ez",
    w: "phon_w",
    wa: "phon_wa",
    w5: "phon_w5",
    "e^": "phon_et",
    "e^_comp": "phon_et",
    "a~": "phon_an",
    "e~": "phon_in",
    "x~": "phon_un",
    "o~": "phon_on",
    x: "phon_e",
    "x^": "phon_eu",
    j: "phon_y",
    z_s: "phon_z",
    g_u: "phon_g",
    "z^_g": "phon_ge",
    s_x: "phon_s",
    "n~": "phon_gn",
    "g~": "phon_ng",
    p: "phon_p",
    t: "phon_t",
    k: "phon_k",
    k_qu: "phon_k",
    b: "phon_b",
    d: "phon_d",
    g: "phon_g",
    f: "phon_f",
    f_ph: "phon_f",
    s: "phon_s",
    s_c: "phon_s",
    s_t: "phon_s",
    "s^": "phon_ch",
    v: "phon_v",
    z: "phon_z",
    "z^": "phon_ge",
    m: "phon_m",
    n: "phon_n",
    l: "phon_l",
    r: "phon_r",
    ks: "phon_ks",
    gz: "phon_gz"
  };

  this.aidodys = {
    verb_3p: "phon_muet",
    "Test-Muettes": "phon_muet",
    "SAMPA:@,SAMPA:9,SAMPA:2": "phon_e",
    "SAMPA:a,SAMPA:A": "phon_a",
    q: "phon_e",
    "SAMPA:i": "phon_i",
    "SAMPA:o,SAMPA:O,LIA:aaoo": "phon_o",
    o_comp: "phon_o",
    o_ouvert: "phon_o",
    "SAMPA:u": "phon_ou",
    "SAMPA:y": "phon_u",
    "SAMPA:e": "phon_ez",
    e_comp: "phon_ez",
    w: "phon_w",
    "LIA:wwaa": "phon_wa",
    "Test-OIN-w5": "phon_w5",
    "SAMPA:E": "phon_et",
    "e^_comp": "phon_et",
    "SAMPA:a~": "phon_an",
    "SAMPA:e~": "phon_in",
    "SAMPA:e~,SAMPA:9~": "phon_un",
    "SAMPA:o~": "phon_on",
    x: "phon_e",
    "x^": "phon_eu",
    "SAMPA:j": "phon_y",
    "SAMPA:z": "phon_z",
    "SAMPA:g": "phon_g",
    "SAMPA:Z": "phon_ge",
    s_x: "phon_s",
    "LIA:nnyy": "phon_gn",
    "Test-ING-g~": "phon_ng",
    "SAMPA:p": "phon_p",
    "SAMPA:t": "phon_t",
    "SAMPA:k": "phon_k",
    k_qu: "phon_k",
    "SAMPA:b": "phon_b",
    "SAMPA:d": "phon_d",
    "SAMPA:g": "phon_g",
    "SAMPA:f": "phon_f",
    f_ph: "phon_f",
    "SAMPA:s": "phon_s",
    s_c: "phon_s",
    s_t: "phon_s",
    "SAMPA:S": "phon_ch",
    "SAMPA:v": "phon_v",
    z: "phon_z",
    "z^": "phon_ge",
    "SAMPA:m": "phon_m",
    "SAMPA:n": "phon_n",
    "SAMPA:l": "phon_l",
    "SAMPA:R": "phon_r",
    "Test-cx-ks": "phon_ks",
    "Test-x-gz": "phon_gz"
  };

  /*
     * Code les typographies adoptées pour les phonèmes et les syllabes
     */
  this.couleurs = {
    syl_1: "color: #0000ff;",
    syl_2: "color: #ff0000;",
    syl_3: "color: #008000;",
    muet: "color: #cccccc;",
    phon_muet: "color: #aaaaaa;",
    phon_e: "color: #ff0000;",
    phon_a: "color: #0023ff;",
    phon_i: "color: #a9d82e;",
    phon_o: "color: #cf6633;",
    phon_ou: "color: #ffcc00; ",
    phon_u: "color: #008000;",
    phon_ez: "color: #00dbc5;",
    phon_w: "color: #892ca0;",
    phon_wa: "color: #892ca0;",
    phon_w5: "color: #3deb3d;",
    phon_et: "color: #666699;",
    phon_an:
      "color: #0023ff; font-family: serif; font-style: oblique; font-weight: bold;",
    phon_in:
      "color: #a9d82e; font-family: serif; font-style: oblique; font-weight: bold;",
    phon_un:
      "color: #a9d82e; font-family: serif; font-style: oblique; font-weight: bold;",
    phon_on:
      "color: #cf6633; font-family: serif; font-style: oblique; font-weight: bold;",
    phon_eu: "color: #198a8a;",
    phon_y:
      "color: #892ca0; font-family: serif; font-style: oblique; font-weight: bold;",
    phon_z: "color: #31859b; font-weight: bold; font-style: oblique; ",
    phon_g: "color: #632423; ",
    phon_ge: "color: #205867; ",
    phon_s: "color: #5f497a; font-weight: bold; font-style: oblique; ",
    phon_gn:
      "color: #938953; font-weight: bold; font-style: oblique; font-family: serif; ",
    phon_ng: "color: #494429; ",
    phon_p:
      "color: #c3d69b; font-weight: bold; font-style: oblique; font-family: serif; ",
    phon_t: "color: #76923c; font-weight: bold; font-style: oblique; ",
    phon_k: "color: #4f6128; ",
    phon_b:
      "color: #d99694; font-weight: bold; font-style: oblique; font-family: serif; ",
    phon_d: "color: #953734; font-weight: bold; font-style: oblique; ",
    phon_f:
      "color: #b2a2c7; font-weight: bold; font-family: serif; font-style: oblique; ",
    phon_ch: "color: #3f3151; ",
    phon_v:
      "color: #92cddc; font-weight: bold; font-style: oblique; font-family: serif; ",
    phon_m: "color: #e36c09; font-weight: bold; font-style: oblique; ",
    phon_n: "color: #974806; ",
    phon_l:
      "color: #fac08f; font-weight: bold; font-style: oblique; font-family: serif; ",
    phon_r: "color: #974806; font-family: serif; ",
    phon_ks:
      "color: #548dd4; font-weight: bold; font-style: oblique; font-family: serif; ",
    phon_gz: "color: #0f243e; "
  };
  this._isyl = 0;

  this.phonemes = {};
  for (var key in this.aidodys) {
    this.phonemes[this.aidodys[key]] = false;
  }
}

var LireCouleurFormateur = new LireCouleurFormat();
var profiles = null;

// Syllabes adaptation take a LCSyll List

function adaptSylls(sylls) {
  var thisLC = LireCouleurFormateur;
  var ret = document.createElement("SPAN");
  sylls.forEach(function (element, index, array) {
    var e = document.createElement("SPAN");
    e.setAttribute("style", getStyle("aidodys_syl" + thisLC._isyl.toString()));
    ret.appendChild(element.texte(e));
    thisLC._isyl = (thisLC._isyl + 1) % 2;
  });
  return ret;
}

function adaptPhons(phons) {
  var mainSpan = $("<span />");
  var thisLC = LireCouleurFormateur;
  phons.forEach(function (element, index, array) {
    var span = $("<span />", { text: element.lettres });
    var phon = thisLC.correspondances[element.phoneme];
    if (element.estPhoneme() && thisLC.phonemes[phon]) {
      span.attr("style", getStyle("aidodys_" + phon));
    } else if (phon == "phon_in" && thisLC.phonemes["phon_un"]) {
      span.attr("style", getStyle("aidodys_phon_un"));
    } else if (phon == "phon_eu" && thisLC.phonemes["phon_e"]) {
      span.attr("style", getStyle("aidodys_phon_e"));
    }
    span.appendTo(mainSpan);
  });

  return mainSpan[0];
}

// Browse all DOM nodes and add styles classes

function adaptEachNode(element, srvType) {
  if (element.childNodes.length != 0) {
    if (srvType == SrvOptions.BOTH) {
      // Not Working apply syl by default because it's the last call
      adaptEachNode(element, SrvOptions.PHON);
      adaptEachNode(element, SrvOptions.SYL);
    } else {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (element.tagName != "SCRIPT") {
          //console.log("CHECK : " + element.childNodes[i].nodeType)
          if (
            element.childNodes[i].nodeType == Node.TEXT_NODE ||
            element.childNodes[i].nodeType == Node.CDATA_SECTION_NODE ||
            element.childNodes[i].nodeName == "SPAN"
          ) {
            var text = element.childNodes[i].textContent;
            //console.log("JE PASSE : " + text)
            var pos = 0;
            var words = text.match(/([a-z@àäâéèêëîïôöûùçœ'’]+)/gi);
            if (words !== null) {
              var newElem = document.createElement("SPAN");
              newElem.setAttribute("style", getStyle("aidodys_std"));
              if (element.nodeName == "A") {
                newElem.setAttribute("style", getStyle("aidodys_link"));
              }
              words.forEach(function (word, index, array) {
                var i = text.indexOf(word, pos);
                newElem.appendChild(
                  document.createTextNode(text.substring(pos, i))
                );
                var phon = LireCouleur.extrairePhonemes(word);
                if (srvType == SrvOptions.PHON)
                  newElem.appendChild(adaptPhons(phon));
                else if (srvType == SrvOptions.SYL) {
                  var sylls = LireCouleur.extraireSyllabes(phon);
                  newElem.appendChild(adaptSylls(sylls));
                } else {
                  var e = document.createElement("SPAN");
                  e.innerText = word;
                  newElem.appendChild(e);
                }
                pos += word.length + (i - pos);
              });
              newElem.appendChild(document.createTextNode(text.substring(pos)));
              element.replaceChild(newElem, element.childNodes[i]);
            }
          } else {
            adaptEachNode(element.childNodes[i], srvType);
          }
        }
      }
    }
  }
}

var aidodysStyle = [];
function initAdaptation(prsList) {
  aidodysStyles = [];
  var srvType = SrvOptions.NULL;

  for (var key in LireCouleurFormateur.aidodys) {
    LireCouleurFormateur.phonemes[LireCouleurFormateur.aidodys[key]] = false;
  }

  var styles = {};

  var phonStyles = {};

  var j = 0;
  if (prsList.serverList.length > 0) {
    $.each(prsList.serverList, function (key, prs) {
      if (prs.processType === "syllabe") {
        if (srvType == SrvOptions.NULL) {
          srvType = SrvOptions.SYL;
        } else if (srvType == SrvOptions.PHON) {
          srvType = SrvOptions.BOTH;
        }
        syllabePrs = prs;
      } else {
        if (srvType == SrvOptions.NULL) {
          srvType = SrvOptions.PHON;
        } else if (srvType == SrvOptions.SYL) {
          srvType = SrvOptions.BOTH;
        }
        LireCouleurFormateur.phonemes[
          LireCouleurFormateur.aidodys[prs.regex]
        ] = true;
      }
      $.map(prs.css, function (val, i) {
        var style = "";
        $.map(val, function (value, prop) {
          style += prop + ":" + value + ";";
        });
        styles[i] = style;
      });

      var length = $.map(styles, function (n, i) {
        return i;
      }).length;
      if (length > 1) {
        //syllabe
        LireCouleurFormateur.couleurs["syl_1"] = styles[0];
        LireCouleurFormateur.couleurs["syl_2"] = styles[1];
      } else {
        LireCouleurFormateur.couleurs[LireCouleurFormateur.aidodys[prs.regex]] =
          styles[0];
        aidodysStyles.push({
          name: "aidodys_" + LireCouleurFormateur.aidodys[prs.regex],
          value:
            LireCouleurFormateur.couleurs[
            LireCouleurFormateur.aidodys[prs.regex]
            ]
        });
      }
    });
  }
  var stdStyles = "";
  if (prsList.clientList.length > 0) {
    $.each(prsList.clientList, function (key, prs) {
      if (prs.processType == "empty") {
        $.map(prs.css, function (val, i) {
          if (i == 0) {
            stdStyles +=
              JSON.stringify(val)
                .substring(1, JSON.stringify(val).length - 1)
                .replace(new RegExp(",", "g"), ";") + ";";
          }
        });
      }
    });
  }

  stdStyles = stdStyles.replace(new RegExp('"', "g"), "");
  var stylesA = [
    { name: "aidodys_syl0", value: LireCouleurFormateur.couleurs["syl_1"] },
    { name: "aidodys_syl1", value: LireCouleurFormateur.couleurs["syl_2"] },
    { name: "aidodys_syl2", value: "" },
    { name: "aidodys_link", value: "border: 1px solid; " + stdStyles },
    { name: "aidodys_std", value: stdStyles },
    { name: "aidodys_mute", value: "" },
    { name: "aidodys_reading_title", value: "text-align: center;" }
  ];

  var archStyles = [
    { name: "aidodys_syl0", value: "" },
    { name: "aidodys_syl1", value: "" },
    { name: "aidodys_syl2", value: "" },
    { name: "aidodys_link", value: "" },
    { name: "aidodys_std", value: "" },
    { name: "aidodys_mute", value: "" },
    { name: "aidodys_reading_title", value: "" }
  ];

  for (var i = 0; i < stylesA.length; i++) {
    try {
      aidodysStyles.push(stylesA[i]);
    } catch (e) {
      aidodysStyles.push(archStyles[i]);
      styleEl.sheet.insertRule(archStyles[i], styleEl.sheet.cssRules.length);
    }
  }
  return srvType;
}

// pass on parameter the html string to adapt

function adaptWebPage(htmlText, profile) {
  console.log('adaptWebPage', htmlText)
  var promise = new Promise((resolve, reject) => {
    var prsList = profile.processList;

    var srvType = initAdaptation(prsList);

    var tabDocument;
    var parser = new DOMParser();

    tabDocument = parser.parseFromString(htmlText, "text/html");
    adaptEachNode(tabDocument.body, srvType);

    var body = "<div>" + tabDocument.body.innerHTML + "</div>";
    var html = $(body);
    if (prsList.clientList.length > 0) {
      applyStdProcess(html, prsList.clientList).then(html => {
        html = html;
        console.log("applied StdProcess", html);
        console.log("s1", $(html).html());
        $.each($(html).find("span"), function (index, item) {
          /*if ($(item).css('letter-spacing')) {
  		var pxValue = $(item).css('letter-spacing');
  	}*/

          if ($(item).css("word-spacing") != null) {
            var pxValue = $(item).css("word-spacing");
            $(item).css("word-spacing", "");
            if (pxValue.indexOf("px") > 0) {
              pxValue = pxValue.substring(0, pxValue.indexOf("px"));

              if (!isNaN(pxValue)) {
                if (!isNaN(pxValue)) {
                  var newValue = 0.25;
                  if (pxValue == 32) {
                    newValue = 1.0;
                  } else if (pxValue == 23) {
                    newValue = 0.75;
                  } else if (pxValue == 15) {
                    newValue = 0.5;
                  }

                  $(item).css("word-spacing", newValue + "em");
                }
              }
            }
          }
          var style = $(item).attr("style");
          if (undefined != style && style.indexOf('"') > -1) {
            style = style.replace(new RegExp('"', "g"), "'");
            $(item).attr("style", style);
          }
        });
        console.log("response", $(html).html());
        resolve($(html).html());
      });
    }
  });
  return promise;
}

// pass on parameter the id of the the profile you would set

function getStyle(name) {
  for (var i = 0; i < aidodysStyles.length; i++) {
    if (aidodysStyles[i].name === name) {
      return aidodysStyles[i].value;
    }
  }
  return "";
}
/*function applyStdProcess(html, processes) {
	//console.log('applyStdProcess');
	//console.log($(html).html());
    $.each(processes, function( key, prs) {
        if (prs.processType != 'empty' ) {
            var styles = {};
            $.map(prs.css, function(val, i) {
                var style = '';
                $.map(val, function(value, prop) {
                    // exception : disable Majuscules and Signes de ponctuation font-size
                    if (prs.name == "Majuscules" || prs.name == "Signes de ponctuation") {
                        if (prop != "font-size") {
                            style += prop + ":" + value + ";";
                        }
                    } else {
                        style += prop + ":" + value + ";";
                    }
                });
                styles[i] = style;

            });

            var length = $.map(styles, function(n, i) { return i; }).length;
            var regexs = prs.regex.split("|");
            
            $(html).ready(function() {
                for(var i = 0; i < regexs.length; i++) {
                    var count = 0;
                    var regex = new RegExp(regexs[i], 'g');
                    findAndReplaceDOMText(html[0], {
                        find: regex,
                        replace: function(portion, match) {
                            var span = document.createElement('span');
                            var txt = document.createTextNode(match);
                            if (length > 1 && regexs.length > 1)
                                span.setAttribute("style",styles[i]);
                            else
                                span.setAttribute("style",styles[count%length]);

                            span.appendChild(txt);
                            count++;
                            return span;
                        }
                    });
                }
            });
        }
    });
    return html;
}*/

function applyStdProcess(html, processes) {
  var promise = new Promise((resolve, reject) => {
    $.each(processes, function (key, prs) {
      console.log("applyStdProcess each", processes);
      if (prs.processType != "empty") {
        var styles = {};
        $.map(prs.css, function (val, i) {
          var style = "";
          $.map(val, function (value, prop) {
            style += prop + ":" + value + ";";
          });
          styles[i] = style;
        });

        var length = $.map(styles, function (n, i) {
          return i;
        }).length;
        var regexs = prs.regex.split("|");
        $(html).ready(function () {
          for (var i = 0; i < regexs.length; i++) {
            var count = 0;
            var lastID = -5;
            var regex = new RegExp(regexs[i], "g");
            findAndReplaceDOMText(html[0], {
              find: regex,
              replace: function (portion, match) {
                var span = document.createElement("span");
                var txt = document.createTextNode(match);
                if (length > 1 && regexs.length > 1)
                  span.setAttribute("style", styles[i]);
                else span.setAttribute("style", styles[count % length]);

                if (match.index != lastID) {
                  span.appendChild(txt);
                  count++;
                }

                lastID = match.index;
                console.log("applyStdProcess span", span);
                return span;
              }
            });
            console.log("after findAndReplace", key, processes.length);
            if (key == processes.length - 1) {
              console.log("applyStdProcess return", html);
              resolve(html);
            }
          }
        });
      } else {
        if (key == processes.length - 1) {
          console.log("applyStdProcess return", html);
          resolve(html);
        }
      }
    });
  });
  return promise;
}
