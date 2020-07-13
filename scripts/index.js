jQuery(document).ready(function($){
	var objNavBar = {
		elementLink:$('.inner-link'),
		elementInner:$('.inner-container'),
		elementHome:$('.home-section'),
		elementEmailButton:$('.btn-email'),
		init:function(){
			varHashValue = window.location.hash.substr(1);
			(varHashValue.length>0) ? this.viewElement(varHashValue) : this.showHome();
		
			this.elementLink.click(function(e){
				$('#topNavbar').removeClass('in');
				objNavBar.changeHash(
					$(this),
					e
				);
			});

			$(window).on('hashchange', function(e){
    			var varHashValue = '';
    			varHashValue = window.location.hash.substr(1);
				(varHashValue.length>0)  ? objNavBar.viewElement(varHashValue) : objNavBar.showHome();
			});

			this.elementEmailButton.click(function(){
				objNavBar.sendContact();
			});

			$(document).on('keyup','#domSearch',function(){
				objNavBar.elementInner.show();
				objNavBar.elementHome.hide();
				var valueToSearch 	=  $(this).val();
				valueToSearch = $.trim(valueToSearch);
				if(valueToSearch.length>0){				
					var value = valueToSearch.toLowerCase();
					$(".inner-container").filter(function(){
						$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
					}); 
				}else{
					objNavBar.showHome();
					objNavBar.changeHash('');
				}
			});
		},
		viewElement:function(varHashValue){
			$('body').css('background','black');
			if(varHashValue == 'hobbies'){
				$('body').css('background','black');
			}else{
				$('body').css('background','white');
			}
			objNavBar.elementInner.hide();
			$('.'+varHashValue+'-container-outer').show();
			objNavBar.updateNavState(varHashValue);
		},
		changeHash:function(objThis, e=''){
			var elementToShow = objThis.attr('data-value')
			location.hash = elementToShow;
			if(e){
				e.preventDefault();
			}
		},
		updateNavState:function(strNavState){
			objNavBar.elementLink.removeClass('reactive');
			if(strNavState.length>0){
				$('[data-value="'+strNavState+'"]').addClass('reactive');
				objNavBar.elementHome.hide();
			}
		},
		showHome:function(){
			objNavBar.elementInner.hide();
			objNavBar.elementLink.removeClass('reactive');
			objNavBar.elementHome.show();
			$('body').css('background','white');
		},
		sendContact:function(){
        	var strEmal = $("#email-phone").val();
        	var strText = $("#email-text").val();
			if(strEmal){
				$('.btn-email').html('<i class="fas fa-fan fa-spin"></i>');
				jQuery.ajax({
					url: "controllers/email_controller.php",
					data:'email='+strEmal+'&text='+strText,
					type: "POST",
					success:function(data){
						$('#message-response').text('Thanks, I appreciate you contacting me. I will get back in touch with you soon!');
						$('#message-response').show();
						$('.btn-email').hide();
						$("#email-phone").val('');
						$("#email-text").val('');
					},
					error:function (){

					}
				});
			}
			else{
				alert('Please fill all the required fields');
			}
		}
	}
	objNavBar.init();
});