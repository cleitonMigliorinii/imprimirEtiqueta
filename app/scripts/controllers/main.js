'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp',['firebase'])
  .controller('MainCtrl', function($scope,$position) {
  }).controller('ControllerProdutor', function($scope,$firebaseArray,$firebaseObject,ngTableParams,$filter ) {
    
 	$scope.myDataRef = new Firebase('https://imprimiretiqueta.firebaseio.com/produtor');
	$scope.listaProdutor = $firebaseArray($scope.myDataRef);  
	$("#success-alert").hide();

     var obj = $firebaseObject($scope.myDataRef);
	 var prx = 0;

     // to take an action after the data loads, use the $loaded() promise
     obj.$loaded().then(function() {
     	$scope.produtor = new Produtor();	

       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(obj, function(value, key) {
          prx = value.Id;
  
       });
       prx += 1;
       $scope.produtor.id = prx;
     });	

	$scope.cadastrarProdutor = function(produtor){

		 	$scope.myDataRef.child($scope.produtor.id).set({
            	name: produtor.name.toUpperCase(),
            	Id: $scope.produtor.id,
        	});

        	$scope.produtor = new Produtor();
 			$scope.produtor.id = prx + 1;
			prx += 1;

 			swal("Cadastro com sucesso !", "Produtor cadastrado com sucesso", "success");
 			$("#nomeProduto").focus();

        	 
	}


}).controller('ControllerProduto', function($scope,$firebaseArray,$firebaseObject,ngTableParams,$filter ) {
    
 	$scope.myDataRef = new Firebase('https://imprimiretiqueta.firebaseio.com/produto');
	$scope.listaProduto = $firebaseArray($scope.myDataRef);  
	$("#success-alert").hide();

     var obj = $firebaseObject($scope.myDataRef);
	 var prx = 0;

     // to take an action after the data loads, use the $loaded() promise
     obj.$loaded().then(function() {
     	$scope.produto = new Produto();	

       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(obj, function(value, key) {
          prx = value.Id;
  
       });
       prx += 1;
       $scope.produto.id = prx;
     });	

	$scope.cadastrarProduto = function(produto){

		 	$scope.myDataRef.child($scope.produto.id).set({
            	descricao: produto.descricao.toUpperCase(),
            	Id: $scope.produto.id,
            	brix :produto.brix,
            	glp : produto.glp,
            	pesoBruto : produto.pesoBruto,
            	pesoLiquido : produto.pesoLiquido,
				pesoBrutolb : produto.pesoBrutolb,
				pesoLiquidolb: produto.pesoLiquidolb,
				temperatura : produto.temperatura,
				tambor:produto.tambor

        	});

        	$scope.produto = new Produto();
 			$scope.produto.id = prx + 1;
			prx += 1;

			swal("Cadastro com sucesso !", "Produto cadastrado com sucesso", "success")

 			$("#descricao").focus();

        	 
	}

}).controller('ControllerEtiqueta', function($scope,$firebaseArray,$firebaseObject,ngTableParams,$filter ) {
    
 	$scope.myDataProduto = new Firebase('https://imprimiretiqueta.firebaseio.com/produto');
	$scope.listaProduto = $firebaseArray($scope.myDataProduto);  
	$("#success-alert").hide();
	$scope.myDataProdutor = new Firebase('https://imprimiretiqueta.firebaseio.com/produtor');
	$scope.listaProdutor = $firebaseArray($scope.myDataProdutor); 
	$scope.etiqueta = new Etiqueta();
	
	$scope.selecionarProdutor = function(prd){

		 $scope.etiqueta.produtor = prd;
		 $scope.produtorSelecionado = $scope.etiqueta.produtor.Id + " - " + $scope.etiqueta.produtor.name;
       	 
	}

	$scope.selecionarProduto = function(prd){

		 $scope.etiqueta.produto = prd;
       	 $scope.produtoSelecionado = $scope.etiqueta.produto.Id + " - " + $scope.etiqueta.produto.descricao;
	}


	$scope.gerarEtiqueta = function(){

		var imagemWebran = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNCMUYzMzFERkEyRjExRTQ4Qzg1QUVCQUE1MkNBQTY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNCMUYzMzFFRkEyRjExRTQ4Qzg1QUVCQUE1MkNBQTY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0IxRjMzMUJGQTJGMTFFNDhDODVBRUJBQTUyQ0FBNjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0IxRjMzMUNGQTJGMTFFNDhDODVBRUJBQTUyQ0FBNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQIBAQICAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCAAyAJsDAREAAhEBAxEB/8QAdwAAAQUBAQADAAAAAAAAAAAAAAUHCAkKBgQBAwsBAQAAAAAAAAAAAAAAAAAAAAAQAAAGAgEDAgMHAgUFAAAAAAIDBAUGBwEICQAREhMKIRQaMSIVFtdZmUEjUWFCFxhxMoIkJREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A1ub1coOvuhD7WFfTWHX1fF53IU/Odc646pVQvu29ZBFIoT6sonP5LQOTOQ2w9jELBY1StYQJQZg3CYs/CVXlOEGjPcG16mLGpX8WPNw2tyYAlDi6r+Pd4Jb2ltIxk1wd3E4NjGDJbWpGAahQMIRiASWLOAizjAcgksXuQ9WLHRfmXXnS/lU2orUYwok1v69aOyqY1osfU6cgx9jCZ6eJTGHET/FVSjCZwKEjCWWfj+0YaXkJgg+wj3IOqLo5qYNFtPOUia3xH8nH2TrHFdIZYvv6n2T5ZnUNkns2IKZKiaGSPv4njBSI5O5rDDDCTPMssAiRGgq/UDQf9qTnC/jzd/1I6A+oGhH7UnOF/Hm7/qR0B9QNCP2pOcL+PN3/AFI6A+oGhH7UnOF/Hm7/AKkdAfUDQj9qTnC/jzd/1I6A+oGhH7UnOF/Hm7/qR0B9QNCP2pOcL+PN3/UjoD6gaEftSc4X8ebv+pHQH1A0I/ak5wv483f9SOgPqBoR+1Jzhfx5u/6kdAfUDQj9qTnC/jzd/wBSOgCPchaGRI11TbRVlu1oirKh8lmUNR7narTCplVtpYmJqLdmWqCmlwmeZbJgnvJJZaP+wMQ89s5x3D5B9RPuDq/WFFLGzis5u3ZrVlgVNbw28fDqobHlrUhwc3PLWozZJYlDW7IhgUJjBBAIZJgc5CHOc4wCeX7j7Vhc5DgjDpnymSfYBrEvXTTVaP6RyVbsVW8NTJY4qbbJnkJNlaZqaIFJMSQAG9WU5qTzBpjfUIKDkgR4LSP3Deu7S6MGbp0d5V9Xq9eJPFom53hsfpK+19TEKcZlImyKx9RNpgkmUgPZG9a+PBBATApDhCGPAQhEPIQ5C/noMxlosxbv7tPXJwMBgQ4rxDOjiQLOMZ9May7NiWYQsZ7fdzkt8Fj/AMugvC3xljpCNKdsJMwIlTnJUOvVtkRRrRYzla6y91hDy0RJqR4D97Kpzki9KQX2/wBZmOg4/jY1QZ9IdFtZNY2pGmSrazqyOppkemCV/wDWsd8T5kljvhxpRZeFBrtNndcd55x/2CCHH3Q4xgImccGtImTcDlL3ZkCYGX7ZLZdLWcFUCAMJpFRa9xhrhqERfn9pD9NBOarAsdvMsBffH3cdAp8hlrXPZ+wWtvHNqrsS+axXXczFP79sq74nCY7Yj/WNE1EnToSkxEbk5xLJ85aNhvaFoIMUDDkCYlUYXgeQdugjVKuO/kagrcW8Tf3EFvQ5pNVFoSnSVaza2R5uMWnBMGSkLWu8hRphqjQFCyEvAsjFgOc4x8M9BGTXzWrk32Ku/aWAQnnkud0rXXR6rCEILNYta9en5LNp/LYYZOZq1JBNzoe0FoIY1OrOV5lKTTRqVhoTAl+kHAwlsDjK5PDFpzYD3AN8jckyYhYobwao69iWp0iow8pKqOSYesnlJlJqUwJYxBwEYixYxnOQ57BX3tjrZza6/bLaPU7BuaKxbIhe29uPdXyR4ctdKfjk3rFJGIc7zt9miBlTfizRLWNKxs4yzMCUITSFRpIchMAPIgBYGu4zOTptCSY4e4CvhvKVLErelGu1T16ShUL1xwU6FCSM95KCcsWHjwWUWHuMwecYDjOc9ugaXYjj05favo21rMgPPNabrJ66gMrnSFon2rlJsUTdwRJlWvypteJA0L1q6PJlSRAMPzoUysJGc4EIoQcZ7Ahan6JcwV76zURdVk83d6VnObXqyGWFJa+a9YKKf0MNcZcyJXwUdJeVqhsUuWWslaAoZwyCsjMCLOA4x2x0D8peMflAcEwVbdz/AN9LExvqhJVJdTtfFSYYyjBkmeJpD1ksz0jyxBFjAu+BBzjPbOOgoxg4efaUcyc24szOVWXuMHrOBorhnexkfpSscmslWvcebXaNmrIMuZPl0Uvd3p7RtPyv4kcmCeZk4Joyg9Bemdxa8pJ4MgFz77Fl4zjOPIjU6giR47/4DC6+WM46DJxyTa67QH82eofHheW30632WW4wUS0us4tev4xDniAQCTX012dL47D2iJuB7C0FOAaYRHr3QZYlZiPBifyAUIXmH6WaNGlbkaRvQkFpUSFMQjRpiQ+JSdKmKCSnIKD/AKSyigYCHH9MY6CqjXXVc2O8sHIVt+6NhqcNgU/qtT0LXjKyEtYljzPKn2fDKMFj72PnyWQGfH4dys4z9mOghdz9yNfZ8p4rtAGBnVSpXuByH0o92PFm7AT1SugdfZIzWDbTi4JcmgAJiYmo8t1VZMxkPoNZgsd8l9shox6DNrWEljFve6a2ay0ZWHuWqXFzVdSSgapGYnIRS6eWc1XAlTtx48+C1KbB7dQmCND8MHiNK+0sWeg0euDa3uyUaF0RJXBEYYnNMSLCC1CcwxIpKWJhjJNCIsYiFRADA98fAYcZ+3HQe3oExKjaGBCcFInQM7aQJWvU+iAhEjKEaMxWuWn5xgsoGRmCGYaYLt3znIhZ6DNLwrWgPf7kD5T+SxSpC5Qhvm0T0e1jUF5CeiS0xUh7hJJAvblH3g5KmkhVoHrIixdhCXCDn4BBjASJ5mtkeFVkFV+tvLO/Mjn8wAV01/X7m12s4gL9HLzDiJQqHWBPkRk0XzyUgCsz7/YzIQZ7d+geng5oStaM4/YQ4VNCSq6gl/WFa+ykThZPzQgx6CW1NHFwqltycvUq3E4RFQoGDyyoMEcEecgF8Q9BNmlo7rfMrVurZynXZBM5/NVrdRFnzRufnR4QJFevTtI2HNftyNUdlpZgxOSPbn84BEWEJ648wZgzBYxnAVD0oZtFsRz43sdsKkhjTT3HrrsiR65NNcqXpexuzttkqLEZNJwse06U4Vk5g0LVIj0pQMJUBOOxHqYOEcILdb8YNbLan9C0ddLs3rZ+mnzbsxTNeje3Rscn2Ta2vTE/p5b8m2GEgd2iByGQtio1MqHlKYoGRkQDPHtgK4ecuSbdmUpRVE65FQZHAdwdjqt1TviUrVLzm0o1ALUeRYkY69bSiPy6ekdoezOiR1UKzBHpkhufRJFkeTSQt0mMjrej6jd3+cSFtgVW1zDglvciXHibmyNRhoQFN2FIzk4BDSlpUwQBB6YciwLtgOO/boGvYqvK1o1VVV3qNGIwJRX0Eky+oY1Y8mk35XdJC4HOstBiYyvAHmUBSv0gdDz1arxNOwM8Qu2MfYFOHt4KVt6UU3dvJttkVhZtnyLWOunT0qMSBSJYpR8GVK4rUsMiaMYzzmqJGpUR65GXgefWbRt4h+Qy/MQXsVtIbKkDzaOZ5DAQ1iZJ+tj1a+S9CvWyuGtja3YxM1WEKlThCU+O5yn5dOb6Z5ZBQcjAHIviGX6GUojvf3bd1Wg4lgcWvULS2vHUkJocmEIZbNo6mj7CX5Yz4gVp0c2Wqiw9+/cGRds9u+A1r9B8dsY79sYx3+Of8/8Ar/j0GZyStTpt57nytjm1Q5F11xU6XyOWSBxa0yVYzK7r2ga3yDssKkK0Z+DW5U5V5PlrqnCSERmTYwMA8YCIWeg0ydBmt4+Y8W5e4o54p8AHmBqheisJKUePfsat11rpU4EeePhjxNi5ffH9e3x+zoNGcslMfg0Wks1ljolY4tD2B5lMlelxmCkTPH4+3KXZ5dFhufgWlb25IYaYL+gAZz0ELeNHYqT7d6aVfs/KPIod6O1nz+Lt+SvRC0Vw4WrNUdYNQS/jnAkleoG31M5znIzhDFnOe/QQS9xfvN/wo40rUTRZ+Ss10bNCDrdT4zXxsjxiFysJMchmUrMd3ZSiQM7fFoQJaMbgceQSiVKExgzSw/ewFMvAxy9cTfHnxm0dRFmbASdkuF1WTCz7fbUGvewj6mQzebyBUYW3gfGCsXRkd/wyJNzWmyoSKTyDMk9wjz8ewc1y2b3+3W3mrK3LSGiU3Lua41ckq2oZtJaY3IZRRLK9zw1Nz+UjxHI7Dik1fkPyx6yEacRqkSXIMAPMGEoQWssvuMeG+lqLbq+qm/Zi8mVNUieJVtHR62bIocPZ8EhwWmHseVJ9SJECQx2Na06f1DREkAEZ5GCADGRYCN/Gtzr8S+q+ldHVHYmykwBaoGV2nNyDDrhsmuwK3rPkjxYNkiMWIKpVolWS5XI1IPUTmnFDCDGQDFjPfoEHSXnu4v4HaG9N73Pfswj0z2S2eVr4gyB172IeDElDVPCo3XlPqzlLRVq1KnMfyUzo55TDMCoT/O+JpZY++MhL9X7grgmWWs03osueRLLZj0CeqzYpqfrNtKe7NEFkL21SR+jzWUZVYkCIl5emJGcpMLJCoP8AlSgDMyWAIcBAWy/cdaD39yC6zFr5TZ9f6cayNdk2+9WjLqOtwxba1/ucfFB6yj0ThcZisilbfHImxSB3XnL3ZCgGarNCUEsIQ+qIHC5FfcCcZGwtVVPRtbXfMX6J2NszQyfYZzM192DayYtrrE503TuzXE0h1rJEpefxpHGSWjCRCBSrHhwyLBfgAYsBOGVe5K4cZLGpBHC9pJq25fmZyZsuINYNmlA0ZbmkORGKiiB1IAJhpRZ2RAwLPbyxjv8ADvjoG8lvuU+I6qaEkbTRVvSyRymvarcW2o66Ra37CMSZ7fY5GhooVFk6t2qtuYWpMpWpk5ORqDiExRXfIhYxjoGp0O9ytog3af0EVurtLLnDas+DlL7yyn1lvX0EE3cXRyXK2YgUMqQyKmp2RGoJSFmITDSTCycC8xCyLPQS44dVVcbKbDcn/JXWaxZIa92r2DratablDvGpFFHJzq/XWkoRGFi8hilrYzSJsQPE/enPHgoSk5NyhAPGO3boH22Y2xXRLlw42tQGpxPSpbSqvbKz5kiAoGWS4kR6Js6ODlGkBz4H+gtZ3kzHl9mQYyH7M9BbiaaUQUaeeaWSQSWM0440YSyiiiw5GYaaYPOAFllgxnIhZzjGMY756DOL7fxuxdc15VuRlc0PCE7cffCXw+vHJwWCUNj5RGtaM+KwBwj5ORjCBInlcxkjecd93J5rdgPjgJIM5DR90H5/Vp7/AO3Opu/fLvceoEnoFrn1vbZWXAU1I3hVU5nL7O23j419q9VYEjjNmRWdRqPxETjEJya5trQ4JjfnRJhEZPTmBLwIGl3V5b+Sa9NYbMoTYS99XYbWty32zadWc/a/62W29S2ERGWRuMS5VNn59WW6Yih5MxQvpaBCzqkZil8bAOA0x2BkiB0Dr0NyQcmmneo0nqXXS3tPZzSuhtwMukTC/TLVy5WM6WKImdAo+8Pj7Kh2+naWuUCkdgATNbYNMBRJcoFRqfBQvEGQibvnMuRDkcaNZrZ2QsXWlaF3m22ulsDh0XqezI1WkKksqYbaraY26mWL5++jmk/URivXACcnICCY5802qhEqjQixgJFa2cr3JzHITrvU7IPjrh1XN1a6vsDU9K9arJlT3FK/sLXyx7LZF65tTWg3Zkz/ABSN0sqRriijCMLl6sswsQA+eMA40d5n+UGR4WKUki44vwucusIjWp68OqdpBM2bldh1sK2IyzGtqq1Ey6n0wYoNOmXKnTCoKR6WkpsBMKwaoAHbt/KhzEPs30YgcfR8eR7pvDCypkyqnzVK1GNLXiMNet9kua8RQbQcFliQtjanYhvVvjWWWmJesGJMg8ghEIIx0z7gzkWsVztFPYkl43qdaqgr7EwnLl/xZt2wHKJyRbsRjW5ir2ZRxtsFkWMbw4yRSjfTz0hjmQljbkkP7jVDORkAo7Pc8nLFqhQVe3LYsH0fVyOb2/clPuEEZtTbFOisYeKUla6HP5htvjtrEedHh1cUOVKZsAjKO/DjAH5H3zkGAk6Vyac0gVFcKnJr43m+JWfa+kVTR6UFa22Qu9d13WgyuZo1qNpBaBShwFTClMFofk4BhEocjAgJGHvjuDMq+cHkzzG7kVtCvRYU/rmd3dEoHU8w0rtSDSm1WvXaDJLEtR0WnLrkXpqykSCMKDT29pccH/PhSGf+wXkZWBBz9387vJrrzAp1KrGV8fZsobLJk9cVNAIhqPaskV23mCG12mmsxdX8u1EzbVkSb3S0GpqQHOIVBri8DGQEBYMBNEDvvnKfzeMlpXFTgIDx2vE7qClte7wNam7XWyAmS+P7BSiGxBK0MZSmxyjyXSvnaWm5dzDA5J9FpVmAzgIO/QKsk5XOWiJPDJGXxdx6Fvr/AL8znQlI8IdQ7VX1W2SKAu0caXKy5TZZdthRxxldsyYlU3thiUxUqRknDwZjIMYyDeSfmx5MavKuVqu6QcfleT+qKFa76bIczae2bPEc7bHqxC6sao0kk7dcrajZVTnLXNrGmXjKPRHtbkFUHP8AaGXkHTa+aHlaSWAy1vHLh4+ljKgebZr2znaG6sXMoWQzYGoK4DZspo+vYMG5W5wuaRyBBk5KyK24aQLmsb1uPSB6ZHzAUFquWney3dvU/MjNZRQbBZGojzUms6KKpK5ljvCEkKv2MW82qpOnhJNhGuih1ZGwh0WODYY9JFZbieWQIJRhJpYQvct3mX5OZCq2ZoRt2X0qXuDMqhNAw19b9Sbwiqqx7Vveo5jPkUaZlqq7HjNdDZ4kyiwle3BOtSDdTyixkBLAIzIL/t89/tiNVUvGXofesdpcOsW7kCv541/kDGTKY5atTWgzSmcWYY121K5ZIVsasU66VZxx6EhvSpVIXGSN5CXJacoKHoNznQZUtsPbz7B3Leu0r/RW61X0lTO21i2lbUrXSvWMm19hqskt6RKBxS8YjWNimWHEfSgFspYGlLXFAOa1KNuABEXk0OTjTgjCs9rzt5JUtnQuU8h1FJ4vdMoiNk2ZZsX0wKbrlkEyq9tJBVkUUCOtoTYbV8akLajcTUYFxBpowmlgwXgzAgh6A+103HKTTVGDlSgByOz7Jl90zpEo0jJyjMtCxnGLOctd21P/AMghlZLQuMIa1TYZ4kZTnkZ9ItPgY/UDq0/tvN8sNzPEzOS+lGplhNgqL3is7jmliZBZ0itg98m05Qw2arFFtqU3+zsenk+dTiUwFKsStE5KiTEpYRgAAPH9NrvYVIUdpoORHXNumhSmu5Dmn0+k4A0G0rahg0oqav6zjycFsFrkVRkVfN3NArTiasnGmmiNEUYYb6pIez6bveJscRTGPch9CFTWdJkKCUoV+miDED12FGYcpriAyPTyPN9gpy4NI4VW6oTImGYFB5kYAdkeDiifTDxx32y27sccIka2ctzGxjhsTLraNTSLae5j9lw2AAiEbrdSRA5Qn2BMWRV7dIPEkGDjU5wey0n1BCNEIwwwECJ+132tqqwrHveD8gdBTu4r6dDBXW0W7pA2ulSuCYqYwyfx+VRyKjtiRFlz2JTyIhfSDTSCkitbkosQCAFmjUhylge062BvNri9U39yEVVP62iUosGw0N0oNRRMez6+U2k8OswmcdcHcdwuLEfCl08dTHLIVC1YZkQx4KKT4EHwB93H28XI2tboG3quWmtnpvquVxGeQGPO+kKHDA3SivZYkncUGcnLu5QHKE2SNhQFYBFHAyjUnl+AwdixA2cb9sfuE1xiY1wh3d1XrKCXWdNHOzVdXaZqATGp8WOhb45ZMC1udnmziz4zBrLijUQndhDUIDgjwMJRPomCBkPBLfbA7nSnKxBJOQDWezUsqskm3VsmsPSMYpXTFhE/lcpykFHAS2+4kEAnKOBsxb6iUKG9vWYS4zkgQw+oMHn+nk5GE03XWGi5iWlRNneOLY26TV/09KfZgczSJVKnx/i4HpZe+VGYezv9gPQWJDnPg2t5ickvw9AvwBr3v2zW70idmIx+5DdcHtZHbckWxMethw0lO/3ViNtSFDGUUhZ48Ai5QNp0AnmIc3mPJKlWIPrF5MLSiFnPcEWUe1K2bspQSRaHKuyyFoMpiFavO40GmaRFIXLXuCS5pn8eaCHlRsCrChlrTI2ROSlVjKUjAmLDk044IcpxB2bj7cXfJe8QOZum9GpMsllLWEondfNsg0pwlhliTiQsyRplGw12trfYBhrzsOThgaDG9xDhaWUNCIYjgjUGiyHLSX2olnstdSqC1juxWcoM2RbUbluC5X7rIRMC3m5UMusiRt170IQyz9AsrKSMTPYpjUkbBKRgz8uYqMW5yqymIDqGz21m8UUfZ2+xvkhoh6kF6L2FxtCeTHSJEsllaSWHw1+rGN2ZQJQbbXJmKe4rZ3E3nGCPb8lGKVBxSjA/SyAO6pP20Ow0RunUKb3ZyXo7bqzUK96UvmCVY06slQ05rc6AOiyaJQ6FSFTeElTQaNzVqiKEci+XQG4PWJ8G+icoHlWENdPQHQHQHQHQHQHQHQHQHQHQHQHQHQHQHQHQHQHQHQHQf//Z"
		var doc = new jsPDF('l', 'cm', [ 7.5, 10.5 ]);

			var i;

			for (i = 0; i < $scope.etiqueta.qtddCopias; i++) {

							var dataFab = $scope.etiqueta.dataFabricacao.split("-");
							var dataVal = $scope.etiqueta.dataValidade.split("-");

							console.log()

							doc.setLineWidth(0.03);
							doc.rect(0.1, 0.1,7.3, 1);
							
							doc.setTextColor(0);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(0.2,0.5,"Produto");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(0.2,1,$scope.etiqueta.produto.descricao.toUpperCase().toString());
							doc.setLineWidth(0.03);
							doc.rect(7.4, 0.1,3.0, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(7.5,0.5,"Lote");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(7.5,1,$scope.etiqueta.loteProduto.toUpperCase().toString());
							doc.rect(0.1,1.1,2, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(0.2,1.45,"Cod. Produto");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(0.2,2,$scope.etiqueta.produto.Id.toString());
							doc.rect(2.1,1.1,2, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(2.2,1.45,"Produtor");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(2.2,2,$scope.etiqueta.produtor.Id.toString());
							doc.rect(4.1,1.1,3.3, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(4.2,1.45,"Data Validade");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(4.2,2,dataVal[1] + "/" + dataVal[0]);
							doc.rect(7.4,1.1,3, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(7.5,1.45,"Data Fabricação");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(7.5,2,dataFab[1] + "/" + dataFab[0]);
							doc.rect(0.1,2.1,2, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(0.2,2.4,"BRIX");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(0.2,3,$scope.etiqueta.produto.brix.toString());
							doc.rect(2.1,2.1,2, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(2.2,2.4,"GLP");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(2.2,3,$scope.etiqueta.produto.glp.toString());
							doc.rect(4.1,2.1,2, 1);
							doc.setFontSize(9);							
							doc.setFont("arial");
							doc.text(4.2,2.4,"Tambor");
							doc.setFontSize(14);
							doc.setFont("arial");
							doc.text(4.2,3, i + 1 +"/" + $scope.etiqueta.qtddCopias.toString());
							doc.rect(6.1,2.1,4.3, 1);
							doc.setFontSize(13);
							doc.setFont("arial");
							doc.text(6.3,2.8,'Fabricado no Brasil');
							doc.rect(0.1,3.1,5.2, 0.6);
							doc.setFontSize(10);							
							doc.setFont("arial");
							doc.text(2.0,3.53,"Peso (kg)");
							doc.rect(5.3,3.1,5.1, 0.6);
							doc.setFontSize(10);							
							doc.setFont("arial");
							doc.text(7,3.53,"Peso (lb)");
							doc.rect(0.1,3.7,2.6, 1.45);
							doc.setFontSize(11);							
							doc.setFont("arial");
							doc.text(0.2,4.1,"Bruto");
							doc.setFontSize(17);
							doc.setFont("arial");
							doc.text(0.7,4.9,$scope.etiqueta.produto.pesoBruto.toString());
							doc.rect(0.1,3.7,5.2, 1.45);
							doc.setFontSize(11);							
							doc.setFont("arial");
							doc.text(2.8,4.1,"Líquido");
							doc.setFontSize(17);
							doc.setFont("arial");
							doc.text(3.5,4.9,$scope.etiqueta.produto.pesoLiquido.toString());
							doc.rect(0.1,3.7,7.8, 1.45);
							doc.setFontSize(11);							
							doc.setFont("arial");
							doc.text(5.4,4.1,"Bruto");
							doc.setFontSize(17);
							doc.setFont("arial");
							doc.text(6.1,4.9,parseInt($scope.etiqueta.produto.pesoBrutolb).toString());
							doc.rect(0.1,3.7,10.3, 1.45);
							doc.setFontSize(11);							
							doc.setFont("arial");
							doc.text(8.2,4.1,"Líquido");
							doc.setFontSize(17);
							doc.setFont("arial");
							doc.text(8.7,4.9,parseInt($scope.etiqueta.produto.pesoLiquidolb).toString());
							doc.rect(0.1,5.15,7.6, 2.27);
							doc.setFontSize(7);							
							doc.setFont("arial");
							doc.text(0.2,5.4,"EQUILIBRE INDÚSTRIA E COMERCIO DE ALIMENTOS LTDA-ME");
							doc.setFontSize(7);							
							doc.setFont("arial");
							doc.text(0.7,5.7,"ESTRADA TAIAÇU X VISTA ALEGRE DO ALTO, KM 1,2");
							doc.text(1.3,6,"BAIRRO: ZONA RURAL - SITIO STA CANDIDA");
							doc.text(2,6.3,"TAIAÇU - SP   CEP: 14.725-000");
							doc.text(2.3,6.6,"CNPJ: 07.433.602/0001-81");	
							doc.text(2.5,6.9,"FONE: (16) 3972-2420 ");	

							var qrCodeImg = create_qrcode($scope.etiqueta.produto.descricao.toUpperCase().toString() + " / TAMBOR  - " + i + 1 +"/" + $scope.etiqueta.qtddCopias.toString());

							doc.setLineWidth(0.03);
							doc.rect(7.7, 5.15, 2.7,
									2.27);
							doc.addImage(qrCodeImg,
									'JPEG', 8, 5.2,
									2.1, 2.1);
				

							if ($scope.etiqueta.qtddCopias > i+1) {
								doc.addPage();
							}
			};
					

		// doc.save('Test.pdf');
		// var log = doc.output('dataurlnewwindow');
		// $log.info(doc.output())


		var blob = doc.output("blob");
		window.open(URL.createObjectURL(blob));

		swal("Geração com sucesso !", "Etiqueta gerada com sucesso", "success")   

		
	}

	var create_qrcode = function(text) {

								var dataURL = qr.toDataURL({
									mime : 'image/jpeg',
									level : 'L',
									size : 7,
									value : text
								});

								return dataURL;

							};

})

function formatReal(mixed) {
	var int = parseInt(mixed.toFixed(0).toString().replace(/[^\d]+/g, ''));
	var tmp = int + '';
	tmp = tmp.replace(/([0-9]{3})$/g);
	if (tmp.length > 6)
		tmp = tmp.replace(/([0-9]{9})/g);

	var str = tmp.charAt(0)

	if (str == ',') {

		tmp = tmp.replace(',', "0,");

	}
	return tmp;
}

function Produtor(){
this.id =0;
this.name = "";

}

function Produto(){
this.id =0;
this.descricao = "";
this.brix =0;
this.glp =0;
this.tambor="";
this.pesoBruto =0;
this.pesoLiquido =0;
this.pesoBrutolb =0;
this.pesoLiquidolb =0;
this.produto =0;
}

function Etiqueta(){
this.produto = new Produto();
this.produtor = new Produtor();
this.loteProduto = "";
this.qtddCopias =0;
this.dataFabricacao;
this.dataValidade;
}