<?php
function filterImg($myFile=[])
{
	$img = [
		'name'            => trim($myFile['name']),
		'size'            => trim($myFile['size']),
		'type'            => trim($myFile['type']),
		'tmp'             => trim($myFile['tmp_name']),
		'pixel'           => @getimagesize($myFile['tmp_name']),
		'error'           => trim($myFile['error']),
		'extension'       => explode(".", trim($myFile['name'])),
		'allowExtension'  => ['png', 'jpg', 'jpeg', 'svg'],
	];

	if (!in_array(end($img['extension']), $img['allowExtension'])) {
		return [
			'status'  => false,
			'msg'     => "The file must be an image!",
		];
	}

	if ($img['type'] !== "image/jpeg" && $img['type'] !== "image/png" && $img['type'] !== "image/svg+xml") {
		return [
			'status'  => false,
			'msg'     => "The file must be an image!",
		];
	}

	if ($img['pixel'] == false && end($img['extension']) !== 'svg') {
		return [
			'status'  => false,
			'msg'     => "Malicious files detected!",
		];
	}

	if (!in_array(end($img['extension']), $img['allowExtension'])) {
		return [
			'status'  => false,
			'msg'     => "The file must be an image!",
		];
	}

	return [
		'status'  => true,
		'msg'     => "",
	];

}


if (isset($_POST['data']) && !empty($_POST['data']) && isset($_FILES['result']) && !empty($_FILES['result'])) {
	
	$filterImg = filterImg($_FILES['result']);
	if ($filterImg['status'] !== true) {
		echo "403";
		exit();
	}

	$img = [
		'name'        => time().htmlspecialchars(addslashes(trim($_POST['data']))),
		'size'        => trim($_FILES['result']['size']),
		'tmp'       	=> trim($_FILES['result']['tmp_name']),
		'pixel'       => @getimagesize($_FILES['result']['tmp_name']),
		'error'       => trim($_FILES['result']['error']),
		'extension'    => explode(".", trim($_FILES['result']['name'])),
		'path'        => "../assets/img/result/original/",
	];

	if (end($img['extension']) == 'svg') {
		echo "403";
		exit();
	}

	if ($img['size'] > 6000000) {
		echo "403";
		exit();
	}

	if ($img['pixel'][0] > 5000 && $img['pixel'][1] > 5000) {
		echo "403";
		exit();
	}

	if (!move_uploaded_file($img['tmp'], $img['path'] . $img['name'] .".". end($img['extension']))) {
		echo "403";
		exit();
	}

	echo "200";

}