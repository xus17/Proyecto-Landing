var cambio = true;

window.onload = function() {
  valoresTestimonios();
};

//Funcion que maqueta y saca los articulos del JSON

$(document).ready(function() {
      var data = $.ajax("./Json/articulos.json")
        .done(function() {
          texto = JSON.parse(data.responseText);
          var lista = [];
          lista = texto.articulos;
          for (var i = 0; i < 6; i++) {
            console.log();
            $('<div>', {
              'class': 'articulo'
            }).append(
              $('<h3>', {
                'text': lista[i].articulo[0].nombre
              }),
              $('<div>', {
                'class': 'articuloint'
              }).append(
                $('<a>', {
                  'href': lista[i].articulo[4].link
                }).append(
                  $('<img>', {
                    'src': lista[i].articulo[2].imagen,
                    'width': '100px',
                    'height': '100px'
                  })
                ),
                $('<p>', {
                  'text': 'Precio: ' + lista[i].articulo[1].precio
                })
              ),
              $('<p>', {
                'text': lista[i].articulo[3].descripcion
              })
            ).appendTo('.articulos');
          }
        })
        .fail(function() {
          console.log("Error al obtener los valores");
        });
        $(".articulos")
        .css("display", "flex")
        .hide()
        .fadeIn(2000);
})

//Funcion que le da la opcion a la variable cambio de cambiar a true o false para
//llamar a los testimonios ya sea para tabla o individuales

$("#cambiarOpcion").click(function() {
  if (cambio == true) {
    cambio = false;
    valoresTestimonios();
    $('#cambiarOpcion').text("Cambiar a individuales");
  } else {
    cambio = true;
    valoresTestimonios();
    $('#cambiarOpcion').text("Cambiar a tabla");
  }
});


//Funcion de ajax que saca los valores del resenas.json

function valoresTestimonios() {
  var data = $.ajax("./Json/resenas.json")
    .done(function() {
      texto = JSON.parse(data.responseText);
      cambiarTestimonios(texto.resenas);
    })
    .fail(function() {
      console.log("Error al obtener los valores");
      setTimeout(
        function() {
          valoresTestimonios();
        }, 5000);
    });
}

//Funcion en la que se maqueta los valores del json y se maqueta a tabla o individuales.

function cambiarTestimonios(lista) {
  $('.resenas').empty();
  var d = 0;
  console.log(lista.length);
  do {
    var num = Math.floor((Math.random() * 7) + 1);
    var num2 = Math.floor((Math.random() * 7) + 1);
    if (num != num2) {
      var num3 = Math.floor((Math.random() * 7) + 1);
      if ((num != num3) && (num2 != num3)) {
        d = 1;
        numaleatorio = [num, num2, num3];
      }
    }
  } while (d == 0);
  if (cambio) {
    for (var i = 0; i < 3; i++) {
      $('<div>', {
        'class': 'resena',
        'width': '20rem'
      }).append(
        $('<h3>', {
          'text': lista[numaleatorio[i]].resena[0].nombre
        }),
        $('<img>', {
          'src': lista[numaleatorio[i]].resena[2].imagen,
          'width': '100px',
          'height': '100px'
        }),
        $('<p>', {
          'text': lista[numaleatorio[i]].resena[3].descripcion
        }),
        $('<p>', {
          'text': 'Fecha : ' + lista[numaleatorio[i]].resena[1].fecha
        })
      ).appendTo('.resenas');
    }
    $(".resenas")
    .css("display", "flex")
    .hide()
    .fadeIn(2000);
  } else {
    $('<table>', {
      'class': 'resenatabla'
    }).append(
      $('<th>', {
        'class': 'column',
        'width': '4rem',
        'text': 'Nombre'
      }),
      $('<th>', {
        'class': 'column',
        'width': '4rem',
        'text': 'Fecha'
      }),
      $('<th>', {
        'class': 'column',
        'width': '4rem',
        'text': 'Descripcion'
      }),
      $('<tr>', {
        'class': 'column',
        'width': '4rem',

      }).append(
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[0]].resena[0].nombre
        }),
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[0]].resena[1].fecha
        }),
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[0]].resena[3].descripcion
        })),
      $('<tr>', {
        'class': 'column',
        'width': '4rem',

      }).append(
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[1]].resena[0].nombre
        }),
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[1]].resena[1].fecha
        }),
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[1]].resena[3].descripcion
        })),
      $('<tr>', {
        'class': 'column',
        'width': '4rem',

      }).append(
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[2]].resena[0].nombre
        }),
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[2]].resena[1].fecha
        }),
        $('<td>', {
          'width': '20rem',
          'text': lista[numaleatorio[2]].resena[3].descripcion
        }))
    ).appendTo('.resenas');
    $(".resenatabla")
        .hide()
        .fadeIn(2000);
  }
}

//Funcion que se realiza cada 5 segundos para ir cambiando los testimonios

setInterval(function() {
  valoresTestimonios()
}, 10000);

//Desabilitar los campos del formulario

$(document).ready(function() {
  for (var i = 2; i < 8; i++) {
    $("#input" + i).prop("disabled", true);
  }
  $("textarea").prop("disabled", true);
})

//Validación del formulario con modales

let nombre = new RegExp('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.-]{2,48}');
let correo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;
let telefono = /^[0-9]{9}$/i;
let contrasena = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

$(document).ready(function() {
  $("input").keyup(function(e) {
    if (nombre.exec($('#input1').val())) {
      $("#input2").prop("disabled", false);
    }
    if (nombre.exec($('#input2').val())) {
      $("#input3").prop("disabled", false);
    }
    if (correo.exec($('#input3').val())) {
      $('#input4').prop("disabled", false);
    }
    if (telefono.exec($('#input4').val())) {
      $('#input5').prop("disabled", false);
    }
    if (nombre.exec($('#input5').val())) {
      $('#input6').prop("disabled", false);
    }
    if (contrasena.exec($('#input6').val())) {
      $('#input7').prop("disabled", false);
    }
    if (nombre.exec($('#input6').val())) {
      if ($('#input6').val() == $('#input7').val()) {
        $('textarea').prop("disabled", false);
      }
    }
  })
})

//Función que me sube arriba del todo con animacion del scrollbar

$(".btnFix").click(function() {
  $("html").animate({
    scrollTop: 0
  }, 400);
});

//$(".btnFix").fadeIn("slow");

$("#mrArticulos").click(function() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      texto = JSON.parse(this.responseText);
      var lista = [];
      lista = texto.articulos;
      for (var i = 6; i < lista.length; i++) {
        console.log();
        $('<div>', {
          'class': 'articulo',
          'width': '20rem'
        }).append(
          $('<h3>', {
            'text': lista[i].articulo[0].nombre
          }),
          $('<div>', {
            'class': 'articuloint',
            'width': '20rem'
          }).append(
            $('<img>', {
              'src': lista[i].articulo[2].imagen,
              'width': '100px',
              'height': '100px'
            }),
            $('<p>', {
              'text': 'Precio: ' + lista[i].articulo[1].precio
            })
          ),
          $('<p>', {
            'text': lista[i].articulo[3].descripcion
          })
        ).appendTo('.articulos');
      }
    }
  };

  xhttp.open("GET", "./Json/articulos.json", true);
  xhttp.send();
});

// Obtener Localizacion que me a ayudado Rafa con su API del tiempo

const API_KEY = "15b4b878cd394bc48085757bd1f8b472";
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  let coord = position.coords;
  var cities = $.ajax("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + coord.latitude + "&lon=" + coord.longitude + "&key=" + API_KEY)
    .done(function() {
      city = JSON.parse(cities.responseText);
      console.log(city.city_name);
    })
    .fail(function() {
      console.log("Error al obtener localización");
    });
}
