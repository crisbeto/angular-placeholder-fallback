'use strict';

angular.module('angular-placeholder-fallback', [])
    .directive('placeholder', [function(){
        if('placeholder' in document.createElement('input')){
            // if browser supports placeholders, do nothing
            return {};
        };

        return {
            restrict:'A',
            link: function(scope, element, attrs, ctrl) {
                // creating a duplicate of the element, without any names, ng model etc attrbutes, 
                // only the ones that matter to the appearance
                var showPlaceholder = function(){
                    if (!element.val()) {
                        element.addClass("ng-hide");
                        duplicate.removeClass("ng-hide");
                        
                        if(element.hasClass("ng-invalid")){
                            duplicate.addClass("ng-invalid");
                        }else{
                             duplicate.removeClass("ng-invalid");
                        };
                    }
                },
                hidePlaceholder = function(){
                    element.removeClass("ng-hide");
                    duplicate.addClass("ng-hide");
                },  
                duplicate = angular.element(
                       element[0].nodeName === "INPUT" ? 
                       "<input class='ng-hide placeholder' type='text'/>" : 
                       "<textarea class='ng-hide placeholder'><textarea/>");

                // set the value to the placeholder value
                // note that ie cries if you use attrs.class
                
                duplicate.addClass(attrs['class'])
                         .val(attrs.placeholder)
                         .bind('focus',function(){
                            // pass the focus from the input, containing the placeholder to the real input
                            // and hide the placeholder element
                            hidePlaceholder();
                            element[0].focus();
                         });
                
                // insert the duplicate element, after the real one
                element.bind('blur', showPlaceholder).after(duplicate); 
                  
                // wait for to see if the element gets a value                          
                var listener = scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    // if nothing show the placeholder
                    if(!angular.isDefined(newValue) && !angular.isDefined(oldValue)){
                        showPlaceholder();
                    }else if(angular.isDefined(newValue)){
                        // else check for the placeholder again and remove the $watch
                        listener();
                        element.val() ? hidePlaceholder() : showPlaceholder();
                    }                               
                });
            }
        }
    }]);
