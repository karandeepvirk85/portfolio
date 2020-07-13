<?php
// Exit if accessed directly
class Email_Controller{
	function __construct(){
		$this->sendEmail($_POST['email'],$_POST['text']);
	}

	public function sendEmail($strName = null, $strMessage = null){
		if(!empty($strName)){
			if(mail('karandeep.virk@yahoo.com', $strName, $strMessage)){
				echo json_encode('send');
			}
		}
	} 
}
new Email_Controller;
?>