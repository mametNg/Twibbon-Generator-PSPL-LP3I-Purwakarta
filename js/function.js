const openLoad = () => {
	$("#get-twibbon").addClass('d-none');
	$("#load-twibbon").removeClass('d-none');
	$("#create-twibbon").addClass('d-none');
}

const openGet = () => {
	$("#get-twibbon").removeClass('d-none');
	$("#load-twibbon").addClass('d-none');
}

const openCreate = () => {
	$("#load-twibbon").addClass('d-none');
	$("#create-twibbon").removeClass('d-none');
}

const openCreate2 = () => {
	$("#download-twibbon").addClass('d-none');
	$("#create-twibbon").removeClass('d-none');
}

const openDownload = () => {
	$("#download-twibbon").removeClass('d-none');
	$("#create-twibbon").addClass('d-none');
}

const imgExtension = (file) => {
  const validExtension = /(\.jpg|\.jpeg|\.png)$/i;
  return (!validExtension.exec(file.name) ? false : true);
}

const airBadge = (msg, type='success') => {

  return `<div id="close-copy" class="alert alert-${type} alert-animate backdrop alert-center position-fixed" role="alert"><div class="d-flex justify-content-between"><div class="position-relative mr-2"><p class="my-1"><i class="fas fa-check"></i> ${msg} </p></div><button type="button" class="btn close close-rotate" data-dismiss="modal" aria-label="Close" onclick="hidde('#close-copy');"><span aria-hidden="true">&times;</span></button></div><div class="progress-alert"></div></div>`;
}

const hidde = (id) => {
  $(id).removeClass('d-block');
  $(id).removeClass('d-flex');
  $(id).addClass('d-none');
}

const setFrame = (field) => {
	$("#preview-twibbon").attr('src', field);
}

const setProfile = (field) => {
	$("#preview-profile").attr('src', field);
}

const copy = (target) => {
  const copyText = $(target);
  copyText.select();
  document.execCommand("copy");
}

const filterChar = (ev, status=false, min=3, allow=[]) => {
  let name = $(ev).val().replace("   ","");
  let array = name.split("");

  let data = {
    'status' : false,
    'msg' : "length missing",
  };
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 'a' || array[i] < 'z' && array[i] >= 'A' || array[i] < 'Z' && allow.includes(array[i])) {
      if (status == true) {
        if (array.length >= min) {
          data = {
            'status' : true,
            'msg' : "",
          };
        } else {
          data = {
            'status' : false,
            'msg' : "length missing",
          };
          break;
        }
      } else {
        data = {
          'status' : true,
          'msg' : "",
        };
      }
    } else {
      data = {
        'status' : false,
        'msg' : "is not char",
      };
      break;
    }
  }

  return data;
}

const filtName = (data1, data2) => {
	const filter = filterChar(data1, true, 3, [' ']);

  if (filter.status == true) {
    $(data1).attr('class', 'form-control is-valid');
    $(data2).text("");
    return true;
  } else {
    $(data1).attr('class', 'form-control is-invalid');
    if (filter.msg == "length missing") {
      $(data2).text("Minimum 3 letters!");
    } else {
      $(data2).text("Can only be letters and spaces!");
    }
    return false;
  }
}

const filtMsg = (data1, data2) => {
  const filter = filterChar(data1, true, 3, [' ', ',', '.', '-', '!', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '\n', '\r', '\t']);

  if (filter.status == true) {
    $(data1).attr('class', 'form-control is-valid');
    $(data2).text("");
    return true;
  } else {
    $(data1).attr('class', 'form-control is-invalid');
    if (filter.msg == "length missing") {
      $(data2).text("Minimum 3 letters!");
    } else {
      $(data2).text("Can only be letters, spaces and -");
    }
    return false;
  }
}

const myCaption = (name="*FULL NAME*", major="*MAJOR*", motiv="*YOUR MOTIVATION*", sch="*FROM SCHOOL*") => {
  let txt = `${motiv}\n\n`;
  txt += `Saya ${name} jurusan ${major} LP3I College Purwakarta, dari ${sch},\n\n`;
  txt += `Saya siap untuk menyukseskan #PSPL2021\n\n`;
  txt += `@lp3i.indonesia\n`;
  txt += `@lp3i.purwakarta\n`;
  txt += `@cso.lp3ipwk\n\n`;
  txt += `#UpgradeYourPersonalBrand\n`;
  txt += `#sayhitolp3i\n`;
  txt += `#MerdekaBermimpi\n`;
  txt += `#pspllp3ipwk2021\n`;
  txt += `#pspllp3iindonesia\n`;
  txt += `#lp3ipurwakarta\n`;
  txt += `#Iamalifelonglearner\n`;
  txt += `#csolp3ipwk`;
  return txt;
}
const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
}
const postField = (url, type='GET', params=false, headers=false, opt=false) => {

  if (opt == true) {
    options = {
      url: url,
      type: type,
      data: params,
      headers: headers,
      cache: false,
      processData: false,
      contentType: false,
    };
  } else {
    options = {
      url: url,
      type: type,
      data: params,
      headers: headers,
    };
  }

  return $.ajax(options);
}