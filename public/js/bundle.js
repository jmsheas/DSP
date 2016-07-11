(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.14.3 - 2015-10-23
 * License: MIT
 */
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/day.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-popup.html","template/tooltip/tooltip-popup.html","template/tooltip/tooltip-template-popup.html","template/popover/popover-html.html","template/popover/popover-template.html","template/popover/popover.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.collapse', [])

  .directive('uibCollapse', ['$animate', '$injector', function($animate, $injector) {
    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
    return {
      link: function(scope, element, attrs) {
        function expand() {
          element.removeClass('collapse')
            .addClass('collapsing')
            .attr('aria-expanded', true)
            .attr('aria-hidden', false);

          if ($animateCss) {
            $animateCss(element, {
              addClass: 'in',
              easing: 'ease',
              to: { height: element[0].scrollHeight + 'px' }
            }).start().finally(expandDone);
          } else {
            $animate.addClass(element, 'in', {
              to: { height: element[0].scrollHeight + 'px' }
            }).then(expandDone);
          }
        }

        function expandDone() {
          element.removeClass('collapsing')
            .addClass('collapse')
            .css({height: 'auto'});
        }

        function collapse() {
          if (!element.hasClass('collapse') && !element.hasClass('in')) {
            return collapseDone();
          }

          element
            // IMPORTANT: The height must be set before adding "collapsing" class.
            // Otherwise, the browser attempts to animate from height 0 (in
            // collapsing class) to the given height here.
            .css({height: element[0].scrollHeight + 'px'})
            // initially all panel collapse have the collapse class, this removal
            // prevents the animation from jumping to collapsed state
            .removeClass('collapse')
            .addClass('collapsing')
            .attr('aria-expanded', false)
            .attr('aria-hidden', true);

          if ($animateCss) {
            $animateCss(element, {
              removeClass: 'in',
              to: {height: '0'}
            }).start().finally(collapseDone);
          } else {
            $animate.removeClass(element, 'in', {
              to: {height: '0'}
            }).then(collapseDone);
          }
        }

        function collapseDone() {
          element.css({height: '0'}); // Required so that collapse works when animation is disabled
          element.removeClass('collapsing')
            .addClass('collapse');
        }

        scope.$watch(attrs.uibCollapse, function(shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

/* Deprecated collapse below */

angular.module('ui.bootstrap.collapse')

  .value('$collapseSuppressWarning', false)

  .directive('collapse', ['$animate', '$injector', '$log', '$collapseSuppressWarning', function($animate, $injector, $log, $collapseSuppressWarning) {
    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
    return {
      link: function(scope, element, attrs) {
        if (!$collapseSuppressWarning) {
          $log.warn('collapse is now deprecated. Use uib-collapse instead.');
        }

        function expand() {
          element.removeClass('collapse')
            .addClass('collapsing')
            .attr('aria-expanded', true)
            .attr('aria-hidden', false);

          if ($animateCss) {
            $animateCss(element, {
              easing: 'ease',
              to: { height: element[0].scrollHeight + 'px' }
            }).start().done(expandDone);
          } else {
            $animate.animate(element, {}, {
              height: element[0].scrollHeight + 'px'
            }).then(expandDone);
          }
        }

        function expandDone() {
          element.removeClass('collapsing')
            .addClass('collapse in')
            .css({height: 'auto'});
        }

        function collapse() {
          if (!element.hasClass('collapse') && !element.hasClass('in')) {
            return collapseDone();
          }

          element
            // IMPORTANT: The height must be set before adding "collapsing" class.
            // Otherwise, the browser attempts to animate from height 0 (in
            // collapsing class) to the given height here.
            .css({height: element[0].scrollHeight + 'px'})
            // initially all panel collapse have the collapse class, this removal
            // prevents the animation from jumping to collapsed state
            .removeClass('collapse in')
            .addClass('collapsing')
            .attr('aria-expanded', false)
            .attr('aria-hidden', true);

          if ($animateCss) {
            $animateCss(element, {
              to: {height: '0'}
            }).start().done(collapseDone);
          } else {
            $animate.animate(element, {}, {
              height: '0'
            }).then(collapseDone);
          }
        }

        function collapseDone() {
          element.css({height: '0'}); // Required so that collapse works when animation is disabled
          element.removeClass('collapsing')
            .addClass('collapse');
        }

        scope.$watch(attrs.collapse, function(shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])

.constant('uibAccordionConfig', {
  closeOthers: true
})

.controller('UibAccordionController', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ?
      $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(this.groups, function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function(event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('uibAccordion', function() {
  return {
    controller: 'UibAccordionController',
    controllerAs: 'accordion',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/accordion/accordion.html';
    }
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('uibAccordionGroup', function() {
  return {
    require: '^uibAccordion',         // We need this directive to be inside an accordion
    transclude: true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/accordion/accordion-group.html';
    },
    scope: {
      heading: '@',               // Interpolate the heading attribute onto this scope
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      accordionCtrl.addGroup(scope);

      scope.openClass = attrs.openClass || 'panel-open';
      scope.panelClass = attrs.panelClass;
      scope.$watch('isOpen', function(value) {
        element.toggleClass(scope.openClass, !!value);
        if (value) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function($event) {
        if (!scope.isDisabled) {
          if (!$event || $event.which === 32) {
            scope.isOpen = !scope.isOpen;
          }
        }
      };
    }
  };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
.directive('uibAccordionHeading', function() {
  return {
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^uibAccordionGroup',
    link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
      // Pass the heading to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('uibAccordionTransclude', function() {
  return {
    require: ['?^uibAccordionGroup', '?^accordionGroup'],
    link: function(scope, element, attrs, controller) {
      controller = controller[0] ? controller[0] : controller[1]; // Delete after we remove deprecation
      scope.$watch(function() { return controller[attrs.uibAccordionTransclude]; }, function(heading) {
        if (heading) {
          element.find('span').html('');
          element.find('span').append(heading);
        }
      });
    }
  };
});

/* Deprecated accordion below */

angular.module('ui.bootstrap.accordion')

  .value('$accordionSuppressWarning', false)

  .controller('AccordionController', ['$scope', '$attrs', '$controller', '$log', '$accordionSuppressWarning', function($scope, $attrs, $controller, $log, $accordionSuppressWarning) {
    if (!$accordionSuppressWarning) {
      $log.warn('AccordionController is now deprecated. Use UibAccordionController instead.');
    }

    angular.extend(this, $controller('UibAccordionController', {
      $scope: $scope,
      $attrs: $attrs
    }));
  }])

  .directive('accordion', ['$log', '$accordionSuppressWarning', function($log, $accordionSuppressWarning) {
    return {
      restrict: 'EA',
      controller: 'AccordionController',
      controllerAs: 'accordion',
      transclude: true,
      replace: false,
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/accordion/accordion.html';
      },
      link: function() {
        if (!$accordionSuppressWarning) {
          $log.warn('accordion is now deprecated. Use uib-accordion instead.');
        }
      }
    };
  }])

  .directive('accordionGroup', ['$log', '$accordionSuppressWarning', function($log, $accordionSuppressWarning) {
    return {
      require: '^accordion',         // We need this directive to be inside an accordion
      restrict: 'EA',
      transclude: true,              // It transcludes the contents of the directive into the template
      replace: true,                // The element containing the directive will be replaced with the template
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/accordion/accordion-group.html';
      },
      scope: {
        heading: '@',               // Interpolate the heading attribute onto this scope
        isOpen: '=?',
        isDisabled: '=?'
      },
      controller: function() {
        this.setHeading = function(element) {
          this.heading = element;
        };
      },
      link: function(scope, element, attrs, accordionCtrl) {
        if (!$accordionSuppressWarning) {
          $log.warn('accordion-group is now deprecated. Use uib-accordion-group instead.');
        }

        accordionCtrl.addGroup(scope);

        scope.openClass = attrs.openClass || 'panel-open';
        scope.panelClass = attrs.panelClass;
        scope.$watch('isOpen', function(value) {
          element.toggleClass(scope.openClass, !!value);
          if (value) {
            accordionCtrl.closeOthers(scope);
          }
        });

        scope.toggleOpen = function($event) {
          if (!scope.isDisabled) {
            if (!$event || $event.which === 32) {
              scope.isOpen = !scope.isOpen;
            }
          }
        };
      }
    };
  }])

  .directive('accordionHeading', ['$log', '$accordionSuppressWarning', function($log, $accordionSuppressWarning) {
    return {
      restrict: 'EA',
      transclude: true,   // Grab the contents to be used as the heading
      template: '',       // In effect remove this element!
      replace: true,
      require: '^accordionGroup',
      link: function(scope, element, attr, accordionGroupCtrl, transclude) {
        if (!$accordionSuppressWarning) {
          $log.warn('accordion-heading is now deprecated. Use uib-accordion-heading instead.');
        }
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
      }
    };
  }])

  .directive('accordionTransclude', ['$log', '$accordionSuppressWarning', function($log, $accordionSuppressWarning) {
    return {
      require: '^accordionGroup',
      link: function(scope, element, attr, controller) {
        if (!$accordionSuppressWarning) {
          $log.warn('accordion-transclude is now deprecated. Use uib-accordion-transclude instead.');
        }

        scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
          if (heading) {
            element.find('span').html('');
            element.find('span').append(heading);
          }
        });
      }
    };
  }]);


angular.module('ui.bootstrap.alert', [])

.controller('UibAlertController', ['$scope', '$attrs', '$interpolate', '$timeout', function($scope, $attrs, $interpolate, $timeout) {
  $scope.closeable = !!$attrs.close;

  var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
    $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

  if (dismissOnTimeout) {
    $timeout(function() {
      $scope.close();
    }, parseInt(dismissOnTimeout, 10));
  }
}])

.directive('uibAlert', function() {
  return {
    controller: 'UibAlertController',
    controllerAs: 'alert',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/alert/alert.html';
    },
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      close: '&'
    }
  };
});

/* Deprecated alert below */

angular.module('ui.bootstrap.alert')

  .value('$alertSuppressWarning', false)

  .controller('AlertController', ['$scope', '$attrs', '$controller', '$log', '$alertSuppressWarning', function($scope, $attrs, $controller, $log, $alertSuppressWarning) {
    if (!$alertSuppressWarning) {
      $log.warn('AlertController is now deprecated. Use UibAlertController instead.');
    }

    angular.extend(this, $controller('UibAlertController', {
      $scope: $scope,
      $attrs: $attrs
    }));
  }])

  .directive('alert', ['$log', '$alertSuppressWarning', function($log, $alertSuppressWarning) {
    return {
      controller: 'AlertController',
      controllerAs: 'alert',
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/alert/alert.html';
      },
      transclude: true,
      replace: true,
      scope: {
        type: '@',
        close: '&'
      },
      link: function() {
        if (!$alertSuppressWarning) {
          $log.warn('alert is now deprecated. Use uib-alert instead.');
        }
      }
    };
  }]);

angular.module('ui.bootstrap.buttons', [])

.constant('uibButtonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
})

.controller('UibButtonsController', ['uibButtonConfig', function(buttonConfig) {
  this.activeClass = buttonConfig.activeClass || 'active';
  this.toggleEvent = buttonConfig.toggleEvent || 'click';
}])

.directive('uibBtnRadio', function() {
  return {
    require: ['uibBtnRadio', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'buttons',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      element.find('input').css({display: 'none'});

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.uibBtnRadio)));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        var isActive = element.hasClass(buttonsCtrl.activeClass);

        if (!isActive || angular.isDefined(attrs.uncheckable)) {
          scope.$apply(function() {
            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.uibBtnRadio));
            ngModelCtrl.$render();
          });
        }
      });
    }
  };
})

.directive('uibBtnCheckbox', function() {
  return {
    require: ['uibBtnCheckbox', 'ngModel'],
    controller: 'UibButtonsController',
    controllerAs: 'button',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      element.find('input').css({display: 'none'});

      function getTrueValue() {
        return getCheckboxValue(attrs.btnCheckboxTrue, true);
      }

      function getFalseValue() {
        return getCheckboxValue(attrs.btnCheckboxFalse, false);
      }

      function getCheckboxValue(attribute, defaultValue) {
        return angular.isDefined(attribute) ? scope.$eval(attribute) : defaultValue;
      }

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        scope.$apply(function() {
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});

/* Deprecated buttons below */

angular.module('ui.bootstrap.buttons')

  .value('$buttonsSuppressWarning', false)

  .controller('ButtonsController', ['$controller', '$log', '$buttonsSuppressWarning', function($controller, $log, $buttonsSuppressWarning) {
    if (!$buttonsSuppressWarning) {
      $log.warn('ButtonsController is now deprecated. Use UibButtonsController instead.');
    }

    angular.extend(this, $controller('UibButtonsController'));
  }])

  .directive('btnRadio', ['$log', '$buttonsSuppressWarning', function($log, $buttonsSuppressWarning) {
    return {
      require: ['btnRadio', 'ngModel'],
      controller: 'ButtonsController',
      controllerAs: 'buttons',
      link: function(scope, element, attrs, ctrls) {
        if (!$buttonsSuppressWarning) {
          $log.warn('btn-radio is now deprecated. Use uib-btn-radio instead.');
        }

        var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        element.find('input').css({display: 'none'});

        //model -> UI
        ngModelCtrl.$render = function() {
          element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
        };

        //ui->model
        element.bind(buttonsCtrl.toggleEvent, function() {
          if (attrs.disabled) {
            return;
          }

          var isActive = element.hasClass(buttonsCtrl.activeClass);

          if (!isActive || angular.isDefined(attrs.uncheckable)) {
            scope.$apply(function() {
              ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.btnRadio));
              ngModelCtrl.$render();
            });
          }
        });
      }
    };
  }])

  .directive('btnCheckbox', ['$document', '$log', '$buttonsSuppressWarning', function($document, $log, $buttonsSuppressWarning) {
    return {
      require: ['btnCheckbox', 'ngModel'],
      controller: 'ButtonsController',
      controllerAs: 'button',
      link: function(scope, element, attrs, ctrls) {
        if (!$buttonsSuppressWarning) {
          $log.warn('btn-checkbox is now deprecated. Use uib-btn-checkbox instead.');
        }

        var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        element.find('input').css({display: 'none'});

        function getTrueValue() {
          return getCheckboxValue(attrs.btnCheckboxTrue, true);
        }

        function getFalseValue() {
          return getCheckboxValue(attrs.btnCheckboxFalse, false);
        }

        function getCheckboxValue(attributeValue, defaultValue) {
          var val = scope.$eval(attributeValue);
          return angular.isDefined(val) ? val : defaultValue;
        }

        //model -> UI
        ngModelCtrl.$render = function() {
          element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
        };

        //ui->model
        element.bind(buttonsCtrl.toggleEvent, function() {
          if (attrs.disabled) {
            return;
          }

          scope.$apply(function() {
            ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
            ngModelCtrl.$render();
          });
        });

        //accessibility
        element.on('keypress', function(e) {
          if (attrs.disabled || e.which !== 32 || $document[0].activeElement !== element[0]) {
            return;
          }

          scope.$apply(function() {
            ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
            ngModelCtrl.$render();
          });
        });
      }
    };
  }]);


/**
 * @ngdoc overview
 * @name ui.bootstrap.carousel
 *
 * @description
 * AngularJS version of an image carousel.
 *
 */
angular.module('ui.bootstrap.carousel', [])

.controller('UibCarouselController', ['$scope', '$element', '$interval', '$animate', function($scope, $element, $interval, $animate) {
  var self = this,
    slides = self.slides = $scope.slides = [],
    NEW_ANIMATE = angular.version.minor >= 4,
    NO_TRANSITION = 'uib-noTransition',
    SLIDE_DIRECTION = 'uib-slideDirection',
    currentIndex = -1,
    currentInterval, isPlaying;
  self.currentSlide = null;

  var destroyed = false;
  /* direction: "prev" or "next" */
  self.select = $scope.select = function(nextSlide, direction) {
    var nextIndex = $scope.indexOfSlide(nextSlide);
    //Decide direction if it's not given
    if (direction === undefined) {
      direction = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';
    }
    //Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide && nextSlide !== self.currentSlide && !$scope.$currentTransition) {
      goNext(nextSlide, nextIndex, direction);
    }
  };

  function goNext(slide, index, direction) {
    // Scope has been destroyed, stop here.
    if (destroyed) { return; }

    angular.extend(slide, {direction: direction, active: true});
    angular.extend(self.currentSlide || {}, {direction: direction, active: false});
    if ($animate.enabled() && !$scope.noTransition && !$scope.$currentTransition &&
      slide.$element && self.slides.length > 1) {
      slide.$element.data(SLIDE_DIRECTION, slide.direction);
      if (self.currentSlide && self.currentSlide.$element) {
        self.currentSlide.$element.data(SLIDE_DIRECTION, slide.direction);
      }

      $scope.$currentTransition = true;
      if (NEW_ANIMATE) {
        $animate.on('addClass', slide.$element, function(element, phase) {
          if (phase === 'close') {
            $scope.$currentTransition = null;
            $animate.off('addClass', element);
          }
        });
      } else {
        slide.$element.one('$animate:close', function closeFn() {
          $scope.$currentTransition = null;
        });
      }
    }

    self.currentSlide = slide;
    currentIndex = index;

    //every time you change slides, reset the timer
    restartTimer();
  }

  $scope.$on('$destroy', function() {
    destroyed = true;
  });

  function getSlideByIndex(index) {
    if (angular.isUndefined(slides[index].index)) {
      return slides[index];
    }
    var i, len = slides.length;
    for (i = 0; i < slides.length; ++i) {
      if (slides[i].index == index) {
        return slides[i];
      }
    }
  }

  self.getCurrentIndex = function() {
    if (self.currentSlide && angular.isDefined(self.currentSlide.index)) {
      return +self.currentSlide.index;
    }
    return currentIndex;
  };

  /* Allow outside people to call indexOf on slides array */
  $scope.indexOfSlide = function(slide) {
    return angular.isDefined(slide.index) ? +slide.index : slides.indexOf(slide);
  };

  $scope.next = function() {
    var newIndex = (self.getCurrentIndex() + 1) % slides.length;

    if (newIndex === 0 && $scope.noWrap()) {
      $scope.pause();
      return;
    }

    return self.select(getSlideByIndex(newIndex), 'next');
  };

  $scope.prev = function() {
    var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;

    if ($scope.noWrap() && newIndex === slides.length - 1) {
      $scope.pause();
      return;
    }

    return self.select(getSlideByIndex(newIndex), 'prev');
  };

  $scope.isActive = function(slide) {
     return self.currentSlide === slide;
  };

  $scope.$watch('interval', restartTimer);
  $scope.$watchCollection('slides', resetTransition);
  $scope.$on('$destroy', resetTimer);

  function restartTimer() {
    resetTimer();
    var interval = +$scope.interval;
    if (!isNaN(interval) && interval > 0) {
      currentInterval = $interval(timerFn, interval);
    }
  }

  function resetTimer() {
    if (currentInterval) {
      $interval.cancel(currentInterval);
      currentInterval = null;
    }
  }

  function timerFn() {
    var interval = +$scope.interval;
    if (isPlaying && !isNaN(interval) && interval > 0 && slides.length) {
      $scope.next();
    } else {
      $scope.pause();
    }
  }

  function resetTransition(slides) {
    if (!slides.length) {
      $scope.$currentTransition = null;
    }
  }

  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };
  $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      resetTimer();
    }
  };

  self.addSlide = function(slide, element) {
    slide.$element = element;
    slides.push(slide);
    //if this is the first slide or the slide is set to active, select it
    if (slides.length === 1 || slide.active) {
      self.select(slides[slides.length - 1]);
      if (slides.length === 1) {
        $scope.play();
      }
    } else {
      slide.active = false;
    }
  };

  self.removeSlide = function(slide) {
    if (angular.isDefined(slide.index)) {
      slides.sort(function(a, b) {
        return +a.index > +b.index;
      });
    }
    //get the index of the slide inside the carousel
    var index = slides.indexOf(slide);
    slides.splice(index, 1);
    if (slides.length > 0 && slide.active) {
      if (index >= slides.length) {
        self.select(slides[index - 1]);
      } else {
        self.select(slides[index]);
      }
    } else if (currentIndex > index) {
      currentIndex--;
    }

    //clean the currentSlide when no more slide
    if (slides.length === 0) {
      self.currentSlide = null;
    }
  };

  $scope.$watch('noTransition', function(noTransition) {
    $element.data(NO_TRANSITION, noTransition);
  });

}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:carousel
 * @restrict EA
 *
 * @description
 * Carousel is the outer container for a set of image 'slides' to showcase.
 *
 * @param {number=} interval The time, in milliseconds, that it will take the carousel to go to the next slide.
 * @param {boolean=} noTransition Whether to disable transitions on the carousel.
 * @param {boolean=} noPause Whether to disable pausing on the carousel (by default, the carousel interval pauses on hover).
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <uib-carousel>
      <uib-slide>
        <img src="http://placekitten.com/150/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>Beautiful!</p>
        </div>
      </uib-slide>
      <uib-slide>
        <img src="http://placekitten.com/100/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>D'aww!</p>
        </div>
      </uib-slide>
    </uib-carousel>
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
 */
.directive('uibCarousel', [function() {
  return {
    transclude: true,
    replace: true,
    controller: 'UibCarouselController',
    controllerAs: 'carousel',
    require: 'carousel',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/carousel/carousel.html';
    },
    scope: {
      interval: '=',
      noTransition: '=',
      noPause: '=',
      noWrap: '&'
    }
  };
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:slide
 * @restrict EA
 *
 * @description
 * Creates a slide inside a {@link ui.bootstrap.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *
 * @param {boolean=} active Model binding, whether or not this slide is currently active.
 * @param {number=} index The index of the slide. The slides will be sorted by this parameter.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
<div ng-controller="CarouselDemoCtrl">
  <uib-carousel>
    <uib-slide ng-repeat="slide in slides" active="slide.active" index="$index">
      <img ng-src="{{slide.image}}" style="margin:auto;">
      <div class="carousel-caption">
        <h4>Slide {{$index}}</h4>
        <p>{{slide.text}}</p>
      </div>
    </uib-slide>
  </uib-carousel>
  Interval, in milliseconds: <input type="number" ng-model="myInterval">
  <br />Enter a negative number to stop the interval.
</div>
  </file>
  <file name="script.js">
function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
}
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
*/

.directive('uibSlide', function() {
  return {
    require: '^uibCarousel',
    restrict: 'EA',
    transclude: true,
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/carousel/slide.html';
    },
    scope: {
      active: '=?',
      actual: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, carouselCtrl) {
      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        if (active) {
          carouselCtrl.select(scope);
        }
      });
    }
  };
})

.animation('.item', [
         '$injector', '$animate',
function ($injector, $animate) {
  var NO_TRANSITION = 'uib-noTransition',
    SLIDE_DIRECTION = 'uib-slideDirection',
    $animateCss = null;

  if ($injector.has('$animateCss')) {
    $animateCss = $injector.get('$animateCss');
  }

  function removeClass(element, className, callback) {
    element.removeClass(className);
    if (callback) {
      callback();
    }
  }

  return {
    beforeAddClass: function(element, className, done) {
      // Due to transclusion, noTransition property is on parent's scope
      if (className == 'active' && element.parent() && element.parent().parent() &&
          !element.parent().parent().data(NO_TRANSITION)) {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction == 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element,
          directionClass + ' ' + direction, done);
        element.addClass(direction);

        if ($animateCss) {
          $animateCss(element, {addClass: directionClass})
            .start()
            .done(removeClassFn);
        } else {
          $animate.addClass(element, directionClass).then(function () {
            if (!stopped) {
              removeClassFn();
            }
            done();
          });
        }

        return function () {
          stopped = true;
        };
      }
      done();
    },
    beforeRemoveClass: function (element, className, done) {
      // Due to transclusion, noTransition property is on parent's scope
      if (className === 'active' && element.parent() && element.parent().parent() &&
          !element.parent().parent().data(NO_TRANSITION)) {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction == 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element, directionClass, done);

        if ($animateCss) {
          $animateCss(element, {addClass: directionClass})
            .start()
            .done(removeClassFn);
        } else {
          $animate.addClass(element, directionClass).then(function() {
            if (!stopped) {
              removeClassFn();
            }
            done();
          });
        }
        return function() {
          stopped = true;
        };
      }
      done();
    }
  };
}]);

/* deprecated carousel below */

angular.module('ui.bootstrap.carousel')

.value('$carouselSuppressWarning', false)

.controller('CarouselController', ['$scope', '$element', '$controller', '$log', '$carouselSuppressWarning', function($scope, $element, $controller, $log, $carouselSuppressWarning) {
  if (!$carouselSuppressWarning) {
    $log.warn('CarouselController is now deprecated. Use UibCarouselController instead.');
  }

  angular.extend(this, $controller('UibCarouselController', {
    $scope: $scope,
    $element: $element
  }));
}])

.directive('carousel', ['$log', '$carouselSuppressWarning', function($log, $carouselSuppressWarning) {
  return {
    transclude: true,
    replace: true,
    controller: 'CarouselController',
    controllerAs: 'carousel',
    require: 'carousel',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/carousel/carousel.html';
    },
    scope: {
      interval: '=',
      noTransition: '=',
      noPause: '=',
      noWrap: '&'
    },
    link: function() {
      if (!$carouselSuppressWarning) {
        $log.warn('carousel is now deprecated. Use uib-carousel instead.');
      }
    }
  };
}])

.directive('slide', ['$log', '$carouselSuppressWarning', function($log, $carouselSuppressWarning) {
  return {
    require: '^carousel',
    transclude: true,
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/carousel/slide.html';
    },
    scope: {
      active: '=?',
      actual: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, carouselCtrl) {
      if (!$carouselSuppressWarning) {
        $log.warn('slide is now deprecated. Use uib-slide instead.');
      }

      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        if (active) {
          carouselCtrl.select(scope);
        }
      });
    }
  };
}]);

angular.module('ui.bootstrap.dateparser', [])

.service('uibDateParser', ['$log', '$locale', 'orderByFilter', function($log, $locale, orderByFilter) {
  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js
  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

  var localeId;
  var formatCodeToRegex;

  this.init = function() {
    localeId = $locale.id;

    this.parsers = {};

    formatCodeToRegex = {
      'yyyy': {
        regex: '\\d{4}',
        apply: function(value) { this.year = +value; }
      },
      'yy': {
        regex: '\\d{2}',
        apply: function(value) { this.year = +value + 2000; }
      },
      'y': {
        regex: '\\d{1,4}',
        apply: function(value) { this.year = +value; }
      },
      'MMMM': {
        regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); }
      },
      'MMM': {
        regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); }
      },
      'MM': {
        regex: '0[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; }
      },
      'M': {
        regex: '[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; }
      },
      'dd': {
        regex: '[0-2][0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; }
      },
      'd': {
        regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; }
      },
      'EEEE': {
        regex: $locale.DATETIME_FORMATS.DAY.join('|')
      },
      'EEE': {
        regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|')
      },
      'HH': {
        regex: '(?:0|1)[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; }
      },
      'hh': {
        regex: '0[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; }
      },
      'H': {
        regex: '1?[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; }
      },
      'h': {
        regex: '[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; }
      },
      'mm': {
        regex: '[0-5][0-9]',
        apply: function(value) { this.minutes = +value; }
      },
      'm': {
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.minutes = +value; }
      },
      'sss': {
        regex: '[0-9][0-9][0-9]',
        apply: function(value) { this.milliseconds = +value; }
      },
      'ss': {
        regex: '[0-5][0-9]',
        apply: function(value) { this.seconds = +value; }
      },
      's': {
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.seconds = +value; }
      },
      'a': {
        regex: $locale.DATETIME_FORMATS.AMPMS.join('|'),
        apply: function(value) {
          if (this.hours === 12) {
            this.hours = 0;
          }

          if (value === 'PM') {
            this.hours += 12;
          }
        }
      }
    };
  };

  this.init();

  function createParser(format) {
    var map = [], regex = format.split('');

    angular.forEach(formatCodeToRegex, function(data, code) {
      var index = format.indexOf(code);

      if (index > -1) {
        format = format.split('');

        regex[index] = '(' + data.regex + ')';
        format[index] = '$'; // Custom symbol to define consumed part of format
        for (var i = index + 1, n = index + code.length; i < n; i++) {
          regex[i] = '';
          format[i] = '$';
        }
        format = format.join('');

        map.push({ index: index, apply: data.apply });
      }
    });

    return {
      regex: new RegExp('^' + regex.join('') + '$'),
      map: orderByFilter(map, 'index')
    };
  }

  this.parse = function(input, format, baseDate) {
    if (!angular.isString(input) || !format) {
      return input;
    }

    format = $locale.DATETIME_FORMATS[format] || format;
    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.parsers[format]) {
      this.parsers[format] = createParser(format);
    }

    var parser = this.parsers[format],
        regex = parser.regex,
        map = parser.map,
        results = input.match(regex);

    if (results && results.length) {
      var fields, dt;
      if (angular.isDate(baseDate) && !isNaN(baseDate.getTime())) {
        fields = {
          year: baseDate.getFullYear(),
          month: baseDate.getMonth(),
          date: baseDate.getDate(),
          hours: baseDate.getHours(),
          minutes: baseDate.getMinutes(),
          seconds: baseDate.getSeconds(),
          milliseconds: baseDate.getMilliseconds()
        };
      } else {
        if (baseDate) {
          $log.warn('dateparser:', 'baseDate is not a valid date');
        }
        fields = { year: 1900, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
      }

      for (var i = 1, n = results.length; i < n; i++) {
        var mapper = map[i-1];
        if (mapper.apply) {
          mapper.apply.call(fields, results[i]);
        }
      }

      if (isValid(fields.year, fields.month, fields.date)) {
        if (angular.isDate(baseDate) && !isNaN(baseDate.getTime())) {
          dt = new Date(baseDate);
          dt.setFullYear(fields.year, fields.month, fields.date,
            fields.hours, fields.minutes, fields.seconds,
            fields.milliseconds || 0);
        } else {
          dt = new Date(fields.year, fields.month, fields.date,
            fields.hours, fields.minutes, fields.seconds,
            fields.milliseconds || 0);
        }
      }

      return dt;
    }
  };

  // Check if date is valid for specific month (and year for February).
  // Month: 0 = Jan, 1 = Feb, etc
  function isValid(year, month, date) {
    if (date < 1) {
      return false;
    }

    if (month === 1 && date > 28) {
      return date === 29 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }

    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return date < 31;
    }

    return true;
  }
}]);

/* Deprecated dateparser below */

angular.module('ui.bootstrap.dateparser')

.value('$dateParserSuppressWarning', false)

.service('dateParser', ['$log', '$dateParserSuppressWarning', 'uibDateParser', function($log, $dateParserSuppressWarning, uibDateParser) {
  if (!$dateParserSuppressWarning) {
    $log.warn('dateParser is now deprecated. Use uibDateParser instead.');
  }

  angular.extend(this, uibDateParser);
}]);

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$uibPosition', ['$document', '$window', function($document, $window) {
    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function(element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function(element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function(element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function(hostEl, targetEl, positionStr, appendToBody) {
        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

        var hostElPos,
          targetElWidth,
          targetElHeight,
          targetElPos;

        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

        targetElWidth = targetEl.prop('offsetWidth');
        targetElHeight = targetEl.prop('offsetHeight');

        var shiftWidth = {
          center: function() {
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
          },
          left: function() {
            return hostElPos.left;
          },
          right: function() {
            return hostElPos.left + hostElPos.width;
          }
        };

        var shiftHeight = {
          center: function() {
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
          },
          top: function() {
            return hostElPos.top;
          },
          bottom: function() {
            return hostElPos.top + hostElPos.height;
          }
        };

        switch (pos0) {
          case 'right':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: shiftWidth[pos0]()
            };
            break;
          case 'left':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: hostElPos.left - targetElWidth
            };
            break;
          case 'bottom':
            targetElPos = {
              top: shiftHeight[pos0](),
              left: shiftWidth[pos1]()
            };
            break;
          default:
            targetElPos = {
              top: hostElPos.top - targetElHeight,
              left: shiftWidth[pos1]()
            };
            break;
        }

        return targetElPos;
      }
    };
  }]);

/* Deprecated position below */

angular.module('ui.bootstrap.position')

.value('$positionSuppressWarning', false)

.service('$position', ['$log', '$positionSuppressWarning', '$uibPosition', function($log, $positionSuppressWarning, $uibPosition) {
  if (!$positionSuppressWarning) {
    $log.warn('$position is now deprecated. Use $uibPosition instead.');
  }

  angular.extend(this, $uibPosition);
}]);

angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.position'])

.value('$datepickerSuppressError', false)

.constant('uibDatepickerConfig', {
  formatDay: 'dd',
  formatMonth: 'MMMM',
  formatYear: 'yyyy',
  formatDayHeader: 'EEE',
  formatDayTitle: 'MMMM yyyy',
  formatMonthTitle: 'yyyy',
  datepickerMode: 'day',
  minMode: 'day',
  maxMode: 'year',
  showWeeks: true,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null,
  shortcutPropagation: false
})

.controller('UibDatepickerController', ['$scope', '$attrs', '$parse', '$interpolate', '$log', 'dateFilter', 'uibDatepickerConfig', '$datepickerSuppressError', function($scope, $attrs, $parse, $interpolate, $log, dateFilter, datepickerConfig, $datepickerSuppressError) {
  var self = this,
      ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl;

  // Modes chain
  this.modes = ['day', 'month', 'year'];

  // Configuration attributes
  angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
                   'showWeeks', 'startingDay', 'yearRange', 'shortcutPropagation'], function(key, index) {
    self[key] = angular.isDefined($attrs[key]) ? (index < 6 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : datepickerConfig[key];
  });

  // Watchable date attributes
  angular.forEach(['minDate', 'maxDate'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = value ? new Date(value) : null;
        self.refreshView();
      });
    } else {
      self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
    }
  });

  angular.forEach(['minMode', 'maxMode'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = angular.isDefined(value) ? value : $attrs[key];
        $scope[key] = self[key];
        if ((key == 'minMode' && self.modes.indexOf($scope.datepickerMode) < self.modes.indexOf(self[key])) || (key == 'maxMode' && self.modes.indexOf($scope.datepickerMode) > self.modes.indexOf(self[key]))) {
          $scope.datepickerMode = self[key];
        }
      });
    } else {
      self[key] = datepickerConfig[key] || null;
      $scope[key] = self[key];
    }
  });

  $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

  if (angular.isDefined($attrs.initDate)) {
    this.activeDate = $scope.$parent.$eval($attrs.initDate) || new Date();
    $scope.$parent.$watch($attrs.initDate, function(initDate) {
      if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
        self.activeDate = initDate;
        self.refreshView();
      }
    });
  } else {
    this.activeDate = new Date();
  }

  $scope.isActive = function(dateObject) {
    if (self.compare(dateObject.date, self.activeDate) === 0) {
      $scope.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;

    ngModelCtrl.$render = function() {
      self.render();
    };
  };

  this.render = function() {
    if (ngModelCtrl.$viewValue) {
      var date = new Date(ngModelCtrl.$viewValue),
          isValid = !isNaN(date);

      if (isValid) {
        this.activeDate = date;
      } else if (!$datepickerSuppressError) {
        $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
      }
    }
    this.refreshView();
  };

  this.refreshView = function() {
    if (this.element) {
      this._refreshView();

      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
      ngModelCtrl.$setValidity('dateDisabled', !date || (this.element && !this.isDisabled(date)));
    }
  };

  this.createDateObject = function(date, format) {
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
    return {
      date: date,
      label: dateFilter(date, format),
      selected: model && this.compare(date, model) === 0,
      disabled: this.isDisabled(date),
      current: this.compare(date, new Date()) === 0,
      customClass: this.customClass(date)
    };
  };

  this.isDisabled = function(date) {
    return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode})));
  };

  this.customClass = function(date) {
    return $scope.customClass({date: date, mode: $scope.datepickerMode});
  };

  // Split array into smaller arrays
  this.split = function(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  };

  $scope.select = function(date) {
    if ($scope.datepickerMode === self.minMode) {
      var dt = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : new Date(0, 0, 0, 0, 0, 0, 0);
      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      ngModelCtrl.$setViewValue(dt);
      ngModelCtrl.$render();
    } else {
      self.activeDate = date;
      $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) - 1];
    }
  };

  $scope.move = function(direction) {
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
        month = self.activeDate.getMonth() + direction * (self.step.months || 0);
    self.activeDate.setFullYear(year, month, 1);
    self.refreshView();
  };

  $scope.toggleMode = function(direction) {
    direction = direction || 1;

    if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
      return;
    }

    $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) + direction];
  };

  // Key event mapper
  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var focusElement = function() {
    self.element[0].focus();
  };

  // Listen for focus requests from popup directive
  $scope.$on('uib:datepicker.focus', focusElement);

  $scope.keydown = function(evt) {
    var key = $scope.keys[evt.which];

    if (!key || evt.shiftKey || evt.altKey) {
      return;
    }

    evt.preventDefault();
    if (!self.shortcutPropagation) {
      evt.stopPropagation();
    }

    if (key === 'enter' || key === 'space') {
      if (self.isDisabled(self.activeDate)) {
        return; // do nothing
      }
      $scope.select(self.activeDate);
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
      $scope.toggleMode(key === 'up' ? 1 : -1);
    } else {
      self.handleKeyDown(key, evt);
      self.refreshView();
    }
  };
}])

.controller('UibDaypickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  this.step = { months: 1 };
  this.element = $element;
  function getDaysInMonth(year, month) {
    return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
  }

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    scope.showWeeks = ctrl.showWeeks;
    ctrl.refreshView();
  };

  this.getDates = function(startDate, n) {
    var dates = new Array(n), current = new Date(startDate), i = 0, date;
    while (i < n) {
      date = new Date(current);
      dates[i++] = date;
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  this._refreshView = function() {
    var year = this.activeDate.getFullYear(),
      month = this.activeDate.getMonth(),
      firstDayOfMonth = new Date(this.activeDate);

    firstDayOfMonth.setFullYear(year, month, 1);

    var difference = this.startingDay - firstDayOfMonth.getDay(),
      numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
      firstDate = new Date(firstDayOfMonth);

    if (numDisplayedFromPreviousMonth > 0) {
      firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
    }

    // 42 is the number of days on a six-month calendar
    var days = this.getDates(firstDate, 42);
    for (var i = 0; i < 42; i ++) {
      days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
        secondary: days[i].getMonth() !== month,
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.labels = new Array(7);
    for (var j = 0; j < 7; j++) {
      scope.labels[j] = {
        abbr: dateFilter(days[j].date, this.formatDayHeader),
        full: dateFilter(days[j].date, 'EEEE')
      };
    }

    scope.title = dateFilter(this.activeDate, this.formatDayTitle);
    scope.rows = this.split(days, 7);

    if (scope.showWeeks) {
      scope.weekNumbers = [];
      var thursdayIndex = (4 + 7 - this.startingDay) % 7,
          numWeeks = scope.rows.length;
      for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
        scope.weekNumbers.push(
          getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
      }
    }
  };

  this.compare = function(date1, date2) {
    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
  };

  function getISO8601WeekNumber(date) {
    var checkDate = new Date(date);
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
    var time = checkDate.getTime();
    checkDate.setMonth(0); // Compare with Jan 1
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
  }

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getDate();

    if (key === 'left') {
      date = date - 1;   // up
    } else if (key === 'up') {
      date = date - 7;   // down
    } else if (key === 'right') {
      date = date + 1;   // down
    } else if (key === 'down') {
      date = date + 7;
    } else if (key === 'pageup' || key === 'pagedown') {
      var month = this.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setMonth(month, 1);
      date = Math.min(getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth()), date);
    } else if (key === 'home') {
      date = 1;
    } else if (key === 'end') {
      date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    }
    this.activeDate.setDate(date);
  };
}])

.controller('UibMonthpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  this.step = { years: 1 };
  this.element = $element;

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    ctrl.refreshView();
  };

  this._refreshView = function() {
    var months = new Array(12),
        year = this.activeDate.getFullYear(),
        date;

    for (var i = 0; i < 12; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(year, i, 1);
      months[i] = angular.extend(this.createDateObject(date, this.formatMonth), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = dateFilter(this.activeDate, this.formatMonthTitle);
    scope.rows = this.split(months, 3);
  };

  this.compare = function(date1, date2) {
    return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getMonth();

    if (key === 'left') {
      date = date - 1;   // up
    } else if (key === 'up') {
      date = date - 3;   // down
    } else if (key === 'right') {
      date = date + 1;   // down
    } else if (key === 'down') {
      date = date + 3;
    } else if (key === 'pageup' || key === 'pagedown') {
      var year = this.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setFullYear(year);
    } else if (key === 'home') {
      date = 0;
    } else if (key === 'end') {
      date = 11;
    }
    this.activeDate.setMonth(date);
  };
}])

.controller('UibYearpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var range;
  this.element = $element;

  function getStartingYear(year) {
    return parseInt((year - 1) / range, 10) * range + 1;
  }

  this.yearpickerInit = function() {
    range = this.yearRange;
    this.step = { years: range };
  };

  this._refreshView = function() {
    var years = new Array(range), date;

    for (var i = 0, start = getStartingYear(this.activeDate.getFullYear()); i < range; i++) {
      date = new Date(this.activeDate);
      date.setFullYear(start + i, 0, 1);
      years[i] = angular.extend(this.createDateObject(date, this.formatYear), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = [years[0].label, years[range - 1].label].join(' - ');
    scope.rows = this.split(years, 5);
  };

  this.compare = function(date1, date2) {
    return date1.getFullYear() - date2.getFullYear();
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getFullYear();

    if (key === 'left') {
      date = date - 1;   // up
    } else if (key === 'up') {
      date = date - 5;   // down
    } else if (key === 'right') {
      date = date + 1;   // down
    } else if (key === 'down') {
      date = date + 5;
    } else if (key === 'pageup' || key === 'pagedown') {
      date += (key === 'pageup' ? - 1 : 1) * this.step.years;
    } else if (key === 'home') {
      date = getStartingYear(this.activeDate.getFullYear());
    } else if (key === 'end') {
      date = getStartingYear(this.activeDate.getFullYear()) + range - 1;
    }
    this.activeDate.setFullYear(date);
  };
}])

.directive('uibDatepicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/datepicker.html';
    },
    scope: {
      datepickerMode: '=?',
      dateDisabled: '&',
      customClass: '&',
      shortcutPropagation: '&?'
    },
    require: ['uibDatepicker', '^ngModel'],
    controller: 'UibDatepickerController',
    controllerAs: 'datepicker',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      datepickerCtrl.init(ngModelCtrl);
    }
  };
})

.directive('uibDaypicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/day.html';
    },
    require: ['^?uibDatepicker', 'uibDaypicker', '^?datepicker'],
    controller: 'UibDaypickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0] || ctrls[2],
        daypickerCtrl = ctrls[1];

      daypickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibMonthpicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/month.html';
    },
    require: ['^?uibDatepicker', 'uibMonthpicker', '^?datepicker'],
    controller: 'UibMonthpickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0] || ctrls[2],
        monthpickerCtrl = ctrls[1];

      monthpickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('uibYearpicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/year.html';
    },
    require: ['^?uibDatepicker', 'uibYearpicker', '^?datepicker'],
    controller: 'UibYearpickerController',
    link: function(scope, element, attrs, ctrls) {
      var ctrl = ctrls[0] || ctrls[2];
      angular.extend(ctrl, ctrls[1]);
      ctrl.yearpickerInit();

      ctrl.refreshView();
    }
  };
})

.constant('uibDatepickerPopupConfig', {
  datepickerPopup: 'yyyy-MM-dd',
  datepickerPopupTemplateUrl: 'template/datepicker/popup.html',
  datepickerTemplateUrl: 'template/datepicker/datepicker.html',
  html5Types: {
    date: 'yyyy-MM-dd',
    'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
    'month': 'yyyy-MM'
  },
  currentText: 'Today',
  clearText: 'Clear',
  closeText: 'Done',
  closeOnDateSelection: true,
  appendToBody: false,
  showButtonBar: true,
  onOpenFocus: true
})

.controller('UibDatepickerPopupController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$document', '$rootScope', '$uibPosition', 'dateFilter', 'uibDateParser', 'uibDatepickerPopupConfig', '$timeout',
function(scope, element, attrs, $compile, $parse, $document, $rootScope, $position, dateFilter, dateParser, datepickerPopupConfig, $timeout) {
  var self = this;
  var cache = {},
    isHtml5DateInput = false;
  var dateFormat, closeOnDateSelection, appendToBody, onOpenFocus,
    datepickerPopupTemplateUrl, datepickerTemplateUrl, popupEl, datepickerEl,
    ngModel, $popup;

  scope.watchData = {};

  this.init = function(_ngModel_) {
    ngModel = _ngModel_;
    closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection;
    appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;
    onOpenFocus = angular.isDefined(attrs.onOpenFocus) ? scope.$parent.$eval(attrs.onOpenFocus) : datepickerPopupConfig.onOpenFocus;
    datepickerPopupTemplateUrl = angular.isDefined(attrs.datepickerPopupTemplateUrl) ? attrs.datepickerPopupTemplateUrl : datepickerPopupConfig.datepickerPopupTemplateUrl;
    datepickerTemplateUrl = angular.isDefined(attrs.datepickerTemplateUrl) ? attrs.datepickerTemplateUrl : datepickerPopupConfig.datepickerTemplateUrl;

    scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;

    if (datepickerPopupConfig.html5Types[attrs.type]) {
      dateFormat = datepickerPopupConfig.html5Types[attrs.type];
      isHtml5DateInput = true;
    } else {
      dateFormat = attrs.datepickerPopup || attrs.uibDatepickerPopup || datepickerPopupConfig.datepickerPopup;
      attrs.$observe('uibDatepickerPopup', function(value, oldValue) {
          var newDateFormat = value || datepickerPopupConfig.datepickerPopup;
          // Invalidate the $modelValue to ensure that formatters re-run
          // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
          if (newDateFormat !== dateFormat) {
            dateFormat = newDateFormat;
            ngModel.$modelValue = null;

            if (!dateFormat) {
              throw new Error('uibDatepickerPopup must have a date format specified.');
            }
          }
      });
    }

    if (!dateFormat) {
      throw new Error('uibDatepickerPopup must have a date format specified.');
    }

    if (isHtml5DateInput && attrs.datepickerPopup) {
      throw new Error('HTML5 date input types do not support custom formats.');
    }

    // popup element used to display calendar
    popupEl = angular.element('<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>');
    popupEl.attr({
      'ng-model': 'date',
      'ng-change': 'dateSelection(date)',
      'template-url': datepickerPopupTemplateUrl
    });

    // datepicker element
    datepickerEl = angular.element(popupEl.children()[0]);
    datepickerEl.attr('template-url', datepickerTemplateUrl);

    if (isHtml5DateInput) {
      if (attrs.type === 'month') {
        datepickerEl.attr('datepicker-mode', '"month"');
        datepickerEl.attr('min-mode', 'month');
      }
    }

    if (attrs.datepickerOptions) {
      var options = scope.$parent.$eval(attrs.datepickerOptions);
      if (options && options.initDate) {
        scope.initDate = options.initDate;
        datepickerEl.attr('init-date', 'initDate');
        delete options.initDate;
      }
      angular.forEach(options, function(value, option) {
        datepickerEl.attr(cameltoDash(option), value);
      });
    }

    angular.forEach(['minMode', 'maxMode', 'minDate', 'maxDate', 'datepickerMode', 'initDate', 'shortcutPropagation'], function(key) {
      if (attrs[key]) {
        var getAttribute = $parse(attrs[key]);
        scope.$parent.$watch(getAttribute, function(value) {
          scope.watchData[key] = value;
          if (key === 'minDate' || key === 'maxDate') {
            cache[key] = new Date(value);
          }
        });
        datepickerEl.attr(cameltoDash(key), 'watchData.' + key);

        // Propagate changes from datepicker to outside
        if (key === 'datepickerMode') {
          var setAttribute = getAttribute.assign;
          scope.$watch('watchData.' + key, function(value, oldvalue) {
            if (angular.isFunction(setAttribute) && value !== oldvalue) {
              setAttribute(scope.$parent, value);
            }
          });
        }
      }
    });
    if (attrs.dateDisabled) {
      datepickerEl.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })');
    }

    if (attrs.showWeeks) {
      datepickerEl.attr('show-weeks', attrs.showWeeks);
    }

    if (attrs.customClass) {
      datepickerEl.attr('custom-class', 'customClass({ date: date, mode: mode })');
    }

    if (!isHtml5DateInput) {
      // Internal API to maintain the correct ng-invalid-[key] class
      ngModel.$$parserName = 'date';
      ngModel.$validators.date = validator;
      ngModel.$parsers.unshift(parseDate);
      ngModel.$formatters.push(function(value) {
        scope.date = value;
        return ngModel.$isEmpty(value) ? value : dateFilter(value, dateFormat);
      });
    } else {
      ngModel.$formatters.push(function(value) {
        scope.date = value;
        return value;
      });
    }

    // Detect changes in the view from the text box
    ngModel.$viewChangeListeners.push(function() {
      scope.date = dateParser.parse(ngModel.$viewValue, dateFormat, scope.date);
    });

    element.bind('keydown', inputKeydownBind);

    $popup = $compile(popupEl)(scope);
    // Prevent jQuery cache memory leak (template is now redundant after linking)
    popupEl.remove();

    if (appendToBody) {
      $document.find('body').append($popup);
    } else {
      element.after($popup);
    }

    scope.$on('$destroy', function() {
      if (scope.isOpen === true) {
        if (!$rootScope.$$phase) {
          scope.$apply(function() {
            scope.isOpen = false;
          });
        }
      }

      $popup.remove();
      element.unbind('keydown', inputKeydownBind);
      $document.unbind('click', documentClickBind);
    });
  };

  scope.getText = function(key) {
    return scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
  };

  scope.isDisabled = function(date) {
    if (date === 'today') {
      date = new Date();
    }

    return ((scope.watchData.minDate && scope.compare(date, cache.minDate) < 0) ||
      (scope.watchData.maxDate && scope.compare(date, cache.maxDate) > 0));
  };

  scope.compare = function(date1, date2) {
    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
  };

  // Inner change
  scope.dateSelection = function(dt) {
    if (angular.isDefined(dt)) {
      scope.date = dt;
    }
    var date = scope.date ? dateFilter(scope.date, dateFormat) : null; // Setting to NULL is necessary for form validators to function
    element.val(date);
    ngModel.$setViewValue(date);

    if (closeOnDateSelection) {
      scope.isOpen = false;
      element[0].focus();
    }
  };

  scope.keydown = function(evt) {
    if (evt.which === 27) {
      scope.isOpen = false;
      element[0].focus();
    }
  };

  scope.select = function(date) {
    if (date === 'today') {
      var today = new Date();
      if (angular.isDate(scope.date)) {
        date = new Date(scope.date);
        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      } else {
        date = new Date(today.setHours(0, 0, 0, 0));
      }
    }
    scope.dateSelection(date);
  };

  scope.close = function() {
    scope.isOpen = false;
    element[0].focus();
  };

  scope.$watch('isOpen', function(value) {
    if (value) {
      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      scope.position.top = scope.position.top + element.prop('offsetHeight');

      $timeout(function() {
        if (onOpenFocus) {
          scope.$broadcast('uib:datepicker.focus');
        }
        $document.bind('click', documentClickBind);
      }, 0, false);
    } else {
      $document.unbind('click', documentClickBind);
    }
  });

  function cameltoDash(string) {
    return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });
  }

  function parseDate(viewValue) {
    if (angular.isNumber(viewValue)) {
      // presumably timestamp to date object
      viewValue = new Date(viewValue);
    }

    if (!viewValue) {
      return null;
    } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
      return viewValue;
    } else if (angular.isString(viewValue)) {
      var date = dateParser.parse(viewValue, dateFormat, scope.date);
      if (isNaN(date)) {
        return undefined;
      } else {
        return date;
      }
    } else {
      return undefined;
    }
  }

  function validator(modelValue, viewValue) {
    var value = modelValue || viewValue;

    if (!attrs.ngRequired && !value) {
      return true;
    }

    if (angular.isNumber(value)) {
      value = new Date(value);
    }
    if (!value) {
      return true;
    } else if (angular.isDate(value) && !isNaN(value)) {
      return true;
    } else if (angular.isString(value)) {
      var date = dateParser.parse(value, dateFormat);
      return !isNaN(date);
    } else {
      return false;
    }
  }

  function documentClickBind(event) {
    var popup = $popup[0];
    var dpContainsTarget = element[0].contains(event.target);
    // The popup node may not be an element node
    // In some browsers (IE) only element nodes have the 'contains' function
    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
    if (scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
      scope.$apply(function() {
        scope.isOpen = false;
      });
    }
  }

  function inputKeydownBind(evt) {
    if (evt.which === 27 && scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      scope.$apply(function() {
        scope.isOpen = false;
      });
      element[0].focus();
    } else if (evt.which === 40 && !scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      scope.$apply(function() {
        scope.isOpen = true;
      });
    }
  }
}])

.directive('uibDatepickerPopup', function() {
  return {
    require: ['ngModel', 'uibDatepickerPopup'],
    controller: 'UibDatepickerPopupController',
    scope: {
      isOpen: '=?',
      currentText: '@',
      clearText: '@',
      closeText: '@',
      dateDisabled: '&',
      customClass: '&'
    },
    link: function(scope, element, attrs, ctrls) {
      var ngModel = ctrls[0],
        ctrl = ctrls[1];

      ctrl.init(ngModel);
    }
  };
})

.directive('uibDatepickerPopupWrap', function() {
  return {
    replace: true,
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/popup.html';
    }
  };
});

/* Deprecated datepicker below */

angular.module('ui.bootstrap.datepicker')

.value('$datepickerSuppressWarning', false)

.controller('DatepickerController', ['$scope', '$attrs', '$parse', '$interpolate', '$log', 'dateFilter', 'uibDatepickerConfig', '$datepickerSuppressError', '$datepickerSuppressWarning', function($scope, $attrs, $parse, $interpolate, $log, dateFilter, datepickerConfig, $datepickerSuppressError, $datepickerSuppressWarning) {
  if (!$datepickerSuppressWarning) {
    $log.warn('DatepickerController is now deprecated. Use UibDatepickerController instead.');
  }

  var self = this,
    ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl;

  this.modes = ['day', 'month', 'year'];

  angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
    'showWeeks', 'startingDay', 'yearRange', 'shortcutPropagation'], function(key, index) {
    self[key] = angular.isDefined($attrs[key]) ? (index < 6 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : datepickerConfig[key];
  });

  angular.forEach(['minDate', 'maxDate'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = value ? new Date(value) : null;
        self.refreshView();
      });
    } else {
      self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
    }
  });

  angular.forEach(['minMode', 'maxMode'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = angular.isDefined(value) ? value : $attrs[key];
        $scope[key] = self[key];
        if ((key == 'minMode' && self.modes.indexOf($scope.datepickerMode) < self.modes.indexOf(self[key])) || (key == 'maxMode' && self.modes.indexOf($scope.datepickerMode) > self.modes.indexOf(self[key]))) {
          $scope.datepickerMode = self[key];
        }
      });
    } else {
      self[key] = datepickerConfig[key] || null;
      $scope[key] = self[key];
    }
  });

  $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

  if (angular.isDefined($attrs.initDate)) {
    this.activeDate = $scope.$parent.$eval($attrs.initDate) || new Date();
    $scope.$parent.$watch($attrs.initDate, function(initDate) {
      if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
        self.activeDate = initDate;
        self.refreshView();
      }
    });
  } else {
    this.activeDate = new Date();
  }

  $scope.isActive = function(dateObject) {
    if (self.compare(dateObject.date, self.activeDate) === 0) {
      $scope.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;

    ngModelCtrl.$render = function() {
      self.render();
    };
  };

  this.render = function() {
    if (ngModelCtrl.$viewValue) {
      var date = new Date(ngModelCtrl.$viewValue),
        isValid = !isNaN(date);

      if (isValid) {
        this.activeDate = date;
      } else if (!$datepickerSuppressError) {
        $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
      }
    }
    this.refreshView();
  };

  this.refreshView = function() {
    if (this.element) {
      this._refreshView();

      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
      ngModelCtrl.$setValidity('dateDisabled', !date || (this.element && !this.isDisabled(date)));
    }
  };

  this.createDateObject = function(date, format) {
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
    return {
      date: date,
      label: dateFilter(date, format),
      selected: model && this.compare(date, model) === 0,
      disabled: this.isDisabled(date),
      current: this.compare(date, new Date()) === 0,
      customClass: this.customClass(date)
    };
  };

  this.isDisabled = function(date) {
    return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode})));
  };

  this.customClass = function(date) {
    return $scope.customClass({date: date, mode: $scope.datepickerMode});
  };

  // Split array into smaller arrays
  this.split = function(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  };

  this.fixTimeZone = function(date) {
    var hours = date.getHours();
    date.setHours(hours === 23 ? hours + 2 : 0);
  };

  $scope.select = function(date) {
    if ($scope.datepickerMode === self.minMode) {
      var dt = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : new Date(0, 0, 0, 0, 0, 0, 0);
      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      ngModelCtrl.$setViewValue(dt);
      ngModelCtrl.$render();
    } else {
      self.activeDate = date;
      $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) - 1];
    }
  };

  $scope.move = function(direction) {
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
      month = self.activeDate.getMonth() + direction * (self.step.months || 0);
    self.activeDate.setFullYear(year, month, 1);
    self.refreshView();
  };

  $scope.toggleMode = function(direction) {
    direction = direction || 1;

    if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
      return;
    }

    $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) + direction];
  };

  // Key event mapper
  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var focusElement = function() {
    self.element[0].focus();
  };

  $scope.$on('uib:datepicker.focus', focusElement);

  $scope.keydown = function(evt) {
    var key = $scope.keys[evt.which];

    if (!key || evt.shiftKey || evt.altKey) {
      return;
    }

    evt.preventDefault();
    if (!self.shortcutPropagation) {
      evt.stopPropagation();
    }

    if (key === 'enter' || key === 'space') {
      if (self.isDisabled(self.activeDate)) {
        return; // do nothing
      }
      $scope.select(self.activeDate);
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
      $scope.toggleMode(key === 'up' ? 1 : -1);
    } else {
      self.handleKeyDown(key, evt);
      self.refreshView();
    }
  };
}])

.directive('datepicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/datepicker.html';
    },
    scope: {
      datepickerMode: '=?',
      dateDisabled: '&',
      customClass: '&',
      shortcutPropagation: '&?'
    },
    require: ['datepicker', '^ngModel'],
    controller: 'DatepickerController',
    controllerAs: 'datepicker',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('datepicker is now deprecated. Use uib-datepicker instead.');
      }

      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      datepickerCtrl.init(ngModelCtrl);
    }
  };
}])

.directive('daypicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: 'template/datepicker/day.html',
    require: ['^datepicker', 'daypicker'],
    controller: 'UibDaypickerController',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('daypicker is now deprecated. Use uib-daypicker instead.');
      }

      var datepickerCtrl = ctrls[0],
        daypickerCtrl = ctrls[1];

      daypickerCtrl.init(datepickerCtrl);
    }
  };
}])

.directive('monthpicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: 'template/datepicker/month.html',
    require: ['^datepicker', 'monthpicker'],
    controller: 'UibMonthpickerController',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('monthpicker is now deprecated. Use uib-monthpicker instead.');
      }

      var datepickerCtrl = ctrls[0],
        monthpickerCtrl = ctrls[1];

      monthpickerCtrl.init(datepickerCtrl);
    }
  };
}])

.directive('yearpicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: 'template/datepicker/year.html',
    require: ['^datepicker', 'yearpicker'],
    controller: 'UibYearpickerController',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('yearpicker is now deprecated. Use uib-yearpicker instead.');
      }

      var ctrl = ctrls[0];
      angular.extend(ctrl, ctrls[1]);
      ctrl.yearpickerInit();

      ctrl.refreshView();
    }
  };
}])

.directive('datepickerPopup', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    require: ['ngModel', 'datepickerPopup'],
    controller: 'UibDatepickerPopupController',
    scope: {
      isOpen: '=?',
      currentText: '@',
      clearText: '@',
      closeText: '@',
      dateDisabled: '&',
      customClass: '&'
    },
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('datepicker-popup is now deprecated. Use uib-datepicker-popup instead.');
      }

      var ngModel = ctrls[0],
        ctrl = ctrls[1];

      ctrl.init(ngModel);
    }
  };
}])

.directive('datepickerPopupWrap', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/popup.html';
    },
    link: function() {
      if (!$datepickerSuppressWarning) {
        $log.warn('datepicker-popup-wrap is now deprecated. Use uib-datepicker-popup-wrap instead.');
      }
    }
  };
}]);

angular.module('ui.bootstrap.dropdown', ['ui.bootstrap.position'])

.constant('uibDropdownConfig', {
  openClass: 'open'
})

.service('uibDropdownService', ['$document', '$rootScope', function($document, $rootScope) {
  var openScope = null;

  this.open = function(dropdownScope) {
    if (!openScope) {
      $document.bind('click', closeDropdown);
      $document.bind('keydown', keybindFilter);
    }

    if (openScope && openScope !== dropdownScope) {
      openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function(dropdownScope) {
    if (openScope === dropdownScope) {
      openScope = null;
      $document.unbind('click', closeDropdown);
      $document.unbind('keydown', keybindFilter);
    }
  };

  var closeDropdown = function(evt) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope) { return; }

    if (evt && openScope.getAutoClose() === 'disabled')  { return ; }

    var toggleElement = openScope.getToggleElement();
    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    if (evt && openScope.getAutoClose() === 'outsideClick' &&
      dropdownElement && dropdownElement[0].contains(evt.target)) {
      return;
    }

    openScope.isOpen = false;

    if (!$rootScope.$$phase) {
      openScope.$apply();
    }
  };

  var keybindFilter = function(evt) {
    if (evt.which === 27) {
      openScope.focusToggleElement();
      closeDropdown();
    } else if (openScope.isKeynavEnabled() && /(38|40)/.test(evt.which) && openScope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      openScope.focusDropdownEntry(evt.which);
    }
  };
}])

.controller('UibDropdownController', ['$scope', '$element', '$attrs', '$parse', 'uibDropdownConfig', 'uibDropdownService', '$animate', '$uibPosition', '$document', '$compile', '$templateRequest', function($scope, $element, $attrs, $parse, dropdownConfig, uibDropdownService, $animate, $position, $document, $compile, $templateRequest) {
  var self = this,
    scope = $scope.$new(), // create a child scope so we are not polluting original one
    templateScope,
    openClass = dropdownConfig.openClass,
    getIsOpen,
    setIsOpen = angular.noop,
    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
    appendToBody = false,
    keynavEnabled =false,
    selectedOption = null;


  $element.addClass('dropdown');

  this.init = function() {
    if ($attrs.isOpen) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }

    appendToBody = angular.isDefined($attrs.dropdownAppendToBody);
    keynavEnabled = angular.isDefined($attrs.uibKeyboardNav);

    if (appendToBody && self.dropdownMenu) {
      $document.find('body').append(self.dropdownMenu);
      $element.on('$destroy', function handleDestroyEvent() {
        self.dropdownMenu.remove();
      });
    }
  };

  this.toggle = function(open) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.getAutoClose = function() {
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
  };

  scope.getElement = function() {
    return $element;
  };

  scope.isKeynavEnabled = function() {
    return keynavEnabled;
  };

  scope.focusDropdownEntry = function(keyCode) {
    var elems = self.dropdownMenu ? //If append to body is used.
      (angular.element(self.dropdownMenu).find('a')) :
      (angular.element($element).find('ul').eq(0).find('a'));

    switch (keyCode) {
      case (40): {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = 0;
        } else {
          self.selectedOption = (self.selectedOption === elems.length - 1 ?
            self.selectedOption :
            self.selectedOption + 1);
        }
        break;
      }
      case (38): {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = elems.length - 1;
        } else {
          self.selectedOption = self.selectedOption === 0 ?
            0 : self.selectedOption - 1;
        }
        break;
      }
    }
    elems[self.selectedOption].focus();
  };

  scope.getDropdownElement = function() {
    return self.dropdownMenu;
  };

  scope.focusToggleElement = function() {
    if (self.toggleElement) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function(isOpen, wasOpen) {
    if (appendToBody && self.dropdownMenu) {
      var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true);
      var css = {
        top: pos.top + 'px',
        display: isOpen ? 'block' : 'none'
      };

      var rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
      if (!rightalign) {
        css.left = pos.left + 'px';
        css.right = 'auto';
      } else {
        css.left = 'auto';
        css.right = (window.innerWidth - (pos.left + $element.prop('offsetWidth'))) + 'px';
      }

      self.dropdownMenu.css(css);
    }

    $animate[isOpen ? 'addClass' : 'removeClass']($element, openClass).then(function() {
      if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
        toggleInvoker($scope, { open: !!isOpen });
      }
    });

    if (isOpen) {
      if (self.dropdownMenuTemplateUrl) {
        $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
          templateScope = scope.$new();
          $compile(tplContent.trim())(templateScope, function(dropdownElement) {
            var newEl = dropdownElement;
            self.dropdownMenu.replaceWith(newEl);
            self.dropdownMenu = newEl;
          });
        });
      }

      scope.focusToggleElement();
      uibDropdownService.open(scope);
    } else {
      if (self.dropdownMenuTemplateUrl) {
        if (templateScope) {
          templateScope.$destroy();
        }
        var newEl = angular.element('<ul class="dropdown-menu"></ul>');
        self.dropdownMenu.replaceWith(newEl);
        self.dropdownMenu = newEl;
      }

      uibDropdownService.close(scope);
      self.selectedOption = null;
    }

    if (angular.isFunction(setIsOpen)) {
      setIsOpen($scope, isOpen);
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    if (scope.getAutoClose() !== 'disabled') {
      scope.isOpen = false;
    }
  });

  var offDestroy = $scope.$on('$destroy', function() {
    scope.$destroy();
  });
  scope.$on('$destroy', offDestroy);
}])

.directive('uibDropdown', function() {
  return {
    controller: 'UibDropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init();
    }
  };
})

.directive('uibDropdownMenu', function() {
  return {
    restrict: 'AC',
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
        return;
      }

      element.addClass('dropdown-menu');

      var tplUrl = attrs.templateUrl;
      if (tplUrl) {
        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
      }

      if (!dropdownCtrl.dropdownMenu) {
        dropdownCtrl.dropdownMenu = element;
      }
    }
  };
})

.directive('uibKeyboardNav', function() {
  return {
    restrict: 'A',
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      element.bind('keydown', function(e) {
        if ([38, 40].indexOf(e.which) !== -1) {
          e.preventDefault();
          e.stopPropagation();

          var elems = dropdownCtrl.dropdownMenu.find('a');

          switch (e.which) {
            case (40): { // Down
              if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                dropdownCtrl.selectedOption = 0;
              } else {
                dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === elems.length -1 ?
                  dropdownCtrl.selectedOption : dropdownCtrl.selectedOption + 1;
              }
              break;
            }
            case (38): { // Up
              if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                dropdownCtrl.selectedOption = elems.length - 1;
              } else {
                dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === 0 ?
                  0 : dropdownCtrl.selectedOption - 1;
              }
              break;
            }
          }
          elems[dropdownCtrl.selectedOption].focus();
        }
      });
    }
  };
})

.directive('uibDropdownToggle', function() {
  return {
    require: '?^uibDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl) {
        return;
      }

      element.addClass('dropdown-toggle');

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if (!element.hasClass('disabled') && !attrs.disabled) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleDropdown);
      });
    }
  };
});

/* Deprecated dropdown below */

angular.module('ui.bootstrap.dropdown')

.value('$dropdownSuppressWarning', false)

.service('dropdownService', ['$log', '$dropdownSuppressWarning', 'uibDropdownService', function($log, $dropdownSuppressWarning, uibDropdownService) {
  if (!$dropdownSuppressWarning) {
    $log.warn('dropdownService is now deprecated. Use uibDropdownService instead.');
  }

  angular.extend(this, uibDropdownService);
}])

.controller('DropdownController', ['$scope', '$element', '$attrs', '$parse', 'uibDropdownConfig', 'uibDropdownService', '$animate', '$uibPosition', '$document', '$compile', '$templateRequest', '$log', '$dropdownSuppressWarning', function($scope, $element, $attrs, $parse, dropdownConfig, uibDropdownService, $animate, $position, $document, $compile, $templateRequest, $log, $dropdownSuppressWarning) {
  if (!$dropdownSuppressWarning) {
    $log.warn('DropdownController is now deprecated. Use UibDropdownController instead.');
  }

  var self = this,
    scope = $scope.$new(), // create a child scope so we are not polluting original one
    templateScope,
    openClass = dropdownConfig.openClass,
    getIsOpen,
    setIsOpen = angular.noop,
    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
    appendToBody = false,
    keynavEnabled =false,
    selectedOption = null;


  $element.addClass('dropdown');

  this.init = function() {
    if ($attrs.isOpen) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }

    appendToBody = angular.isDefined($attrs.dropdownAppendToBody);
    keynavEnabled = angular.isDefined($attrs.uibKeyboardNav);

    if (appendToBody && self.dropdownMenu) {
      $document.find('body').append(self.dropdownMenu);
      $element.on('$destroy', function handleDestroyEvent() {
        self.dropdownMenu.remove();
      });
    }
  };

  this.toggle = function(open) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.getAutoClose = function() {
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
  };

  scope.getElement = function() {
    return $element;
  };

  scope.isKeynavEnabled = function() {
    return keynavEnabled;
  };

  scope.focusDropdownEntry = function(keyCode) {
    var elems = self.dropdownMenu ? //If append to body is used.
      (angular.element(self.dropdownMenu).find('a')) :
      (angular.element($element).find('ul').eq(0).find('a'));

    switch (keyCode) {
      case (40): {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = 0;
        } else {
          self.selectedOption = (self.selectedOption === elems.length -1 ?
            self.selectedOption :
          self.selectedOption + 1);
        }
        break;
      }
      case (38): {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = elems.length - 1;
        } else {
          self.selectedOption = self.selectedOption === 0 ?
            0 : self.selectedOption - 1;
        }
        break;
      }
    }
    elems[self.selectedOption].focus();
  };

  scope.getDropdownElement = function() {
    return self.dropdownMenu;
  };

  scope.focusToggleElement = function() {
    if (self.toggleElement) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function(isOpen, wasOpen) {
    if (appendToBody && self.dropdownMenu) {
      var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true);
      var css = {
        top: pos.top + 'px',
        display: isOpen ? 'block' : 'none'
      };

      var rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
      if (!rightalign) {
        css.left = pos.left + 'px';
        css.right = 'auto';
      } else {
        css.left = 'auto';
        css.right = (window.innerWidth - (pos.left + $element.prop('offsetWidth'))) + 'px';
      }

      self.dropdownMenu.css(css);
    }

    $animate[isOpen ? 'addClass' : 'removeClass']($element, openClass).then(function() {
      if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
        toggleInvoker($scope, { open: !!isOpen });
      }
    });

    if (isOpen) {
      if (self.dropdownMenuTemplateUrl) {
        $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
          templateScope = scope.$new();
          $compile(tplContent.trim())(templateScope, function(dropdownElement) {
            var newEl = dropdownElement;
            self.dropdownMenu.replaceWith(newEl);
            self.dropdownMenu = newEl;
          });
        });
      }

      scope.focusToggleElement();
      uibDropdownService.open(scope);
    } else {
      if (self.dropdownMenuTemplateUrl) {
        if (templateScope) {
          templateScope.$destroy();
        }
        var newEl = angular.element('<ul class="dropdown-menu"></ul>');
        self.dropdownMenu.replaceWith(newEl);
        self.dropdownMenu = newEl;
      }

      uibDropdownService.close(scope);
      self.selectedOption = null;
    }

    if (angular.isFunction(setIsOpen)) {
      setIsOpen($scope, isOpen);
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    if (scope.getAutoClose() !== 'disabled') {
      scope.isOpen = false;
    }
  });

  var offDestroy = $scope.$on('$destroy', function() {
    scope.$destroy();
  });
  scope.$on('$destroy', offDestroy);
}])

.directive('dropdown', ['$log', '$dropdownSuppressWarning', function($log, $dropdownSuppressWarning) {
  return {
    controller: 'DropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!$dropdownSuppressWarning) {
        $log.warn('dropdown is now deprecated. Use uib-dropdown instead.');
      }

      dropdownCtrl.init();
    }
  };
}])

.directive('dropdownMenu', ['$log', '$dropdownSuppressWarning', function($log, $dropdownSuppressWarning) {
  return {
    restrict: 'AC',
    require: '?^dropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
        return;
      }

      if (!$dropdownSuppressWarning) {
        $log.warn('dropdown-menu is now deprecated. Use uib-dropdown-menu instead.');
      }

      element.addClass('dropdown-menu');

      var tplUrl = attrs.templateUrl;
      if (tplUrl) {
        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
      }

      if (!dropdownCtrl.dropdownMenu) {
        dropdownCtrl.dropdownMenu = element;
      }
    }
  };
}])

.directive('keyboardNav', ['$log', '$dropdownSuppressWarning', function($log, $dropdownSuppressWarning) {
  return {
    restrict: 'A',
    require: '?^dropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!$dropdownSuppressWarning) {
        $log.warn('keyboard-nav is now deprecated. Use uib-keyboard-nav instead.');
      }

      element.bind('keydown', function(e) {
        if ([38, 40].indexOf(e.which) !== -1) {
          e.preventDefault();
          e.stopPropagation();

          var elems = dropdownCtrl.dropdownMenu.find('a');

          switch (e.which) {
            case (40): { // Down
              if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                dropdownCtrl.selectedOption = 0;
              } else {
                dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === elems.length -1 ?
                  dropdownCtrl.selectedOption : dropdownCtrl.selectedOption + 1;
              }
              break;
            }
            case (38): { // Up
              if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                dropdownCtrl.selectedOption = elems.length - 1;
              } else {
                dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === 0 ?
                  0 : dropdownCtrl.selectedOption - 1;
              }
              break;
            }
          }
          elems[dropdownCtrl.selectedOption].focus();
        }
      });
    }
  };
}])

.directive('dropdownToggle', ['$log', '$dropdownSuppressWarning', function($log, $dropdownSuppressWarning) {
  return {
    require: '?^dropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!$dropdownSuppressWarning) {
        $log.warn('dropdown-toggle is now deprecated. Use uib-dropdown-toggle instead.');
      }

      if (!dropdownCtrl) {
        return;
      }

      element.addClass('dropdown-toggle');

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if (!element.hasClass('disabled') && !attrs.disabled) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleDropdown);
      });
    }
  };
}]);

angular.module('ui.bootstrap.stackedMap', [])
/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function() {
    return {
      createNew: function() {
        var stack = [];

        return {
          add: function(key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function(key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function() {
            return stack[stack.length - 1];
          },
          remove: function(key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function() {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function() {
            return stack.length;
          }
        };
      }
    };
  });
angular.module('ui.bootstrap.modal', ['ui.bootstrap.stackedMap'])
/**
 * A helper, internal data structure that stores all references attached to key
 */
  .factory('$$multiMap', function() {
    return {
      createNew: function() {
        var map = {};

        return {
          entries: function() {
            return Object.keys(map).map(function(key) {
              return {
                key: key,
                value: map[key]
              };
            });
          },
          get: function(key) {
            return map[key];
          },
          hasKey: function(key) {
            return !!map[key];
          },
          keys: function() {
            return Object.keys(map);
          },
          put: function(key, value) {
            if (!map[key]) {
              map[key] = [];
            }

            map[key].push(value);
          },
          remove: function(key, value) {
            var values = map[key];

            if (!values) {
              return;
            }

            var idx = values.indexOf(value);

            if (idx !== -1) {
              values.splice(idx, 1);
            }

            if (!values.length) {
              delete map[key];
            }
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('uibModalBackdrop', [
           '$animate', '$injector', '$uibModalStack',
  function($animate ,  $injector,   $modalStack) {
    var $animateCss = null;

    if ($injector.has('$animateCss')) {
      $animateCss = $injector.get('$animateCss');
    }

    return {
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      compile: function(tElement, tAttrs) {
        tElement.addClass(tAttrs.backdropClass);
        return linkFn;
      }
    };

    function linkFn(scope, element, attrs) {
      // Temporary fix for prefixing
      element.addClass('modal-backdrop');

      if (attrs.modalInClass) {
        if ($animateCss) {
          $animateCss(element, {
            addClass: attrs.modalInClass
          }).start();
        } else {
          $animate.addClass(element, attrs.modalInClass);
        }

        scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
          var done = setIsAsync();
          if ($animateCss) {
            $animateCss(element, {
              removeClass: attrs.modalInClass
            }).start().then(done);
          } else {
            $animate.removeClass(element, attrs.modalInClass).then(done);
          }
        });
      }
    }
  }])

  .directive('uibModalWindow', [
           '$uibModalStack', '$q', '$animate', '$injector',
  function($modalStack ,  $q ,  $animate,   $injector) {
    var $animateCss = null;

    if ($injector.has('$animateCss')) {
      $animateCss = $injector.get('$animateCss');
    }

    return {
      scope: {
        index: '@'
      },
      replace: true,
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'template/modal/window.html';
      },
      link: function(scope, element, attrs) {
        element.addClass(attrs.windowClass || '');
        element.addClass(attrs.windowTopClass || '');
        scope.size = attrs.size;

        scope.close = function(evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };

        // moved from template to fix issue #2280
        element.on('click', scope.close);

        // This property is only added to the scope for the purpose of detecting when this directive is rendered.
        // We can detect that by using this property in the template associated with this directive and then use
        // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
        scope.$isRendered = true;

        // Deferred object that will be resolved when this modal is render.
        var modalRenderDeferObj = $q.defer();
        // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
        // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
        attrs.$observe('modalRender', function(value) {
          if (value == 'true') {
            modalRenderDeferObj.resolve();
          }
        });

        modalRenderDeferObj.promise.then(function() {
          var animationPromise = null;

          if (attrs.modalInClass) {
            if ($animateCss) {
              animationPromise = $animateCss(element, {
                addClass: attrs.modalInClass
              }).start();
            } else {
              animationPromise = $animate.addClass(element, attrs.modalInClass);
            }

            scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
              var done = setIsAsync();
              if ($animateCss) {
                $animateCss(element, {
                  removeClass: attrs.modalInClass
                }).start().then(done);
              } else {
                $animate.removeClass(element, attrs.modalInClass).then(done);
              }
            });
          }


          $q.when(animationPromise).then(function() {
            var inputWithAutofocus = element[0].querySelector('[autofocus]');
            /**
             * Auto-focusing of a freshly-opened modal element causes any child elements
             * with the autofocus attribute to lose focus. This is an issue on touch
             * based devices which will show and then hide the onscreen keyboard.
             * Attempts to refocus the autofocus element via JavaScript will not reopen
             * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
             * the modal element if the modal does not contain an autofocus element.
             */
            if (inputWithAutofocus) {
              inputWithAutofocus.focus();
            } else {
              element[0].focus();
            }
          });

          // Notify {@link $modalStack} that modal is rendered.
          var modal = $modalStack.getTop();
          if (modal) {
            $modalStack.modalRendered(modal.key);
          }
        });
      }
    };
  }])

  .directive('uibModalAnimationClass', function() {
    return {
      compile: function(tElement, tAttrs) {
        if (tAttrs.modalAnimation) {
          tElement.addClass(tAttrs.uibModalAnimationClass);
        }
      }
    };
  })

  .directive('uibModalTransclude', function() {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        $transclude($scope.$parent, function(clone) {
          $element.empty();
          $element.append(clone);
        });
      }
    };
  })

  .factory('$uibModalStack', [
             '$animate', '$timeout', '$document', '$compile', '$rootScope',
             '$q',
             '$injector',
             '$$multiMap',
             '$$stackedMap',
    function($animate ,  $timeout ,  $document ,  $compile ,  $rootScope ,
              $q,
              $injector,
              $$multiMap,
              $$stackedMap) {
      var $animateCss = null;

      if ($injector.has('$animateCss')) {
        $animateCss = $injector.get('$animateCss');
      }

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var openedClasses = $$multiMap.createNew();
      var $modalStack = {
        NOW_CLOSING_EVENT: 'modal.stack.now-closing'
      };

      //Modal focus behavior
      var focusableElementList;
      var focusIndex = 0;
      var tababbleSelector = 'a[href], area[href], input:not([disabled]), ' +
        'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
        'iframe, object, embed, *[tabindex], *[contenteditable=true]';

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance, elementToReceiveFocus) {
        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
          var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
          openedClasses.remove(modalBodyClass, modalInstance);
          body.toggleClass(modalBodyClass, openedClasses.hasKey(modalBodyClass));
          toggleTopWindowClass(true);
        });
        checkRemoveBackdrop();

        //move focus to specified element if available, or else to body
        if (elementToReceiveFocus && elementToReceiveFocus.focus) {
          elementToReceiveFocus.focus();
        } else {
          body.focus();
        }
      }

      // Add or remove "windowTopClass" from the top window in the stack
      function toggleTopWindowClass(toggleSwitch) {
        var modalWindow;

        if (openedWindows.length() > 0) {
          modalWindow = openedWindows.top().value;
          modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
        }
      }

      function checkRemoveBackdrop() {
        //remove backdrop if no longer needed
        if (backdropDomEl && backdropIndex() == -1) {
          var backdropScopeRef = backdropScope;
          removeAfterAnimate(backdropDomEl, backdropScope, function() {
            backdropScopeRef = null;
          });
          backdropDomEl = undefined;
          backdropScope = undefined;
        }
      }

      function removeAfterAnimate(domEl, scope, done) {
        var asyncDeferred;
        var asyncPromise = null;
        var setIsAsync = function() {
          if (!asyncDeferred) {
            asyncDeferred = $q.defer();
            asyncPromise = asyncDeferred.promise;
          }

          return function asyncDone() {
            asyncDeferred.resolve();
          };
        };
        scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

        // Note that it's intentional that asyncPromise might be null.
        // That's when setIsAsync has not been called during the
        // NOW_CLOSING_EVENT broadcast.
        return $q.when(asyncPromise).then(afterAnimating);

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          if ($animateCss) {
            $animateCss(domEl, {
              event: 'leave'
            }).start().then(function() {
              domEl.remove();
            });
          } else {
            $animate.leave(domEl);
          }
          scope.$destroy();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function(evt) {
        if (evt.isDefaultPrevented()) {
          return evt;
        }

        var modal = openedWindows.top();
        if (modal && modal.value.keyboard) {
          switch (evt.which) {
            case 27: {
              evt.preventDefault();
              $rootScope.$apply(function() {
                $modalStack.dismiss(modal.key, 'escape key press');
              });
              break;
            }
            case 9: {
              $modalStack.loadFocusElementList(modal);
              var focusChanged = false;
              if (evt.shiftKey) {
                if ($modalStack.isFocusInFirstItem(evt)) {
                  focusChanged = $modalStack.focusLastFocusableElement();
                }
              } else {
                if ($modalStack.isFocusInLastItem(evt)) {
                  focusChanged = $modalStack.focusFirstFocusableElement();
                }
              }

              if (focusChanged) {
                evt.preventDefault();
                evt.stopPropagation();
              }
              break;
            }
          }
        }
      });

      $modalStack.open = function(modalInstance, modal) {
        var modalOpener = $document[0].activeElement,
          modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

        toggleTopWindowClass(false);

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          renderDeferred: modal.renderDeferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard,
          openedClass: modal.openedClass,
          windowTopClass: modal.windowTopClass
        });

        openedClasses.put(modalBodyClass, modalInstance);

        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          var angularBackgroundDomEl = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');
          angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
          if (modal.animation) {
            angularBackgroundDomEl.attr('modal-animation', 'true');
          }
          backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
          body.append(backdropDomEl);
        }

        var angularDomEl = angular.element('<div uib-modal-window="modal-window"></div>');
        angularDomEl.attr({
          'template-url': modal.windowTemplateUrl,
          'window-class': modal.windowClass,
          'window-top-class': modal.windowTopClass,
          'size': modal.size,
          'index': openedWindows.length() - 1,
          'animate': 'animate'
        }).html(modal.content);
        if (modal.animation) {
          angularDomEl.attr('modal-animation', 'true');
        }

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        openedWindows.top().value.modalOpener = modalOpener;
        body.append(modalDomEl);
        body.addClass(modalBodyClass);

        $modalStack.clearFocusListCache();
      };

      function broadcastClosing(modalWindow, resultOrReason, closing) {
        return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
      }

      $modalStack.close = function(modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow && broadcastClosing(modalWindow, result, true)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }
        return !modalWindow;
      };

      $modalStack.dismiss = function(modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
          modalWindow.value.modalScope.$$uibDestructionScheduled = true;
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance, modalWindow.value.modalOpener);
          return true;
        }
        return !modalWindow;
      };

      $modalStack.dismissAll = function(reason) {
        var topModal = this.getTop();
        while (topModal && this.dismiss(topModal.key, reason)) {
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function() {
        return openedWindows.top();
      };

      $modalStack.modalRendered = function(modalInstance) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.renderDeferred.resolve();
        }
      };

      $modalStack.focusFirstFocusableElement = function() {
        if (focusableElementList.length > 0) {
          focusableElementList[0].focus();
          return true;
        }
        return false;
      };
      $modalStack.focusLastFocusableElement = function() {
        if (focusableElementList.length > 0) {
          focusableElementList[focusableElementList.length - 1].focus();
          return true;
        }
        return false;
      };

      $modalStack.isFocusInFirstItem = function(evt) {
        if (focusableElementList.length > 0) {
          return (evt.target || evt.srcElement) == focusableElementList[0];
        }
        return false;
      };

      $modalStack.isFocusInLastItem = function(evt) {
        if (focusableElementList.length > 0) {
          return (evt.target || evt.srcElement) == focusableElementList[focusableElementList.length - 1];
        }
        return false;
      };

      $modalStack.clearFocusListCache = function() {
        focusableElementList = [];
        focusIndex = 0;
      };

      $modalStack.loadFocusElementList = function(modalWindow) {
        if (focusableElementList === undefined || !focusableElementList.length) {
          if (modalWindow) {
            var modalDomE1 = modalWindow.value.modalDomEl;
            if (modalDomE1 && modalDomE1.length) {
              focusableElementList = modalDomE1[0].querySelectorAll(tababbleSelector);
            }
          }
        }
      };

      return $modalStack;
    }])

  .provider('$uibModal', function() {
    var $modalProvider = {
      options: {
        animation: true,
        backdrop: true, //can also be false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$templateRequest', '$controller', '$uibModalStack', '$modalSuppressWarning', '$log',
        function ($injector, $rootScope, $q, $templateRequest, $controller, $modalStack, $modalSuppressWarning, $log) {
          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function(value) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              } else if (angular.isString(value)) {
                promisesArr.push($q.when($injector.get(value)));
              } else {
                promisesArr.push($q.when(value));
              }
            });
            return promisesArr;
          }

          var promiseChain = null;
          $modal.getPromiseChain = function() {
            return promiseChain;
          };

          $modal.open = function(modalOptions) {
            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();
            var modalRenderDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              rendered: modalRenderDeferred.promise,
              close: function (result) {
                return $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                return $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

            function resolveWithTemplate() {
              return templateAndResolvePromise;
            }

            // Wait for the resolution of the existing promise chain.
            // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
            // Then add to $modalStack and resolve opened.
            // Finally clean up the chain variable if no subsequent modal has overwritten it.
            var samePromise;
            samePromise = promiseChain = $q.all([promiseChain])
              .then(resolveWithTemplate, resolveWithTemplate)
              .then(function resolveSuccess(tplAndVars) {

                var modalScope = (modalOptions.scope || $rootScope).$new();
                modalScope.$close = modalInstance.close;
                modalScope.$dismiss = modalInstance.dismiss;

                modalScope.$on('$destroy', function() {
                  if (!modalScope.$$uibDestructionScheduled) {
                    modalScope.$dismiss('$uibUnscheduledDestruction');
                  }
                });

                var ctrlInstance, ctrlLocals = {};
                var resolveIter = 1;

                //controllers
                if (modalOptions.controller) {
                  ctrlLocals.$scope = modalScope;
                  ctrlLocals.$uibModalInstance = modalInstance;
                  Object.defineProperty(ctrlLocals, '$modalInstance', {
                    get: function() {
                      if (!$modalSuppressWarning) {
                        $log.warn('$modalInstance is now deprecated. Use $uibModalInstance instead.');
                      }

                      return modalInstance;
                    }
                  });
                  angular.forEach(modalOptions.resolve, function(value, key) {
                    ctrlLocals[key] = tplAndVars[resolveIter++];
                  });

                  ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                  if (modalOptions.controllerAs) {
                    if (modalOptions.bindToController) {
                      angular.extend(ctrlInstance, modalScope);
                    }

                    modalScope[modalOptions.controllerAs] = ctrlInstance;
                  }
                }

                $modalStack.open(modalInstance, {
                  scope: modalScope,
                  deferred: modalResultDeferred,
                  renderDeferred: modalRenderDeferred,
                  content: tplAndVars[0],
                  animation: modalOptions.animation,
                  backdrop: modalOptions.backdrop,
                  keyboard: modalOptions.keyboard,
                  backdropClass: modalOptions.backdropClass,
                  windowTopClass: modalOptions.windowTopClass,
                  windowClass: modalOptions.windowClass,
                  windowTemplateUrl: modalOptions.windowTemplateUrl,
                  size: modalOptions.size,
                  openedClass: modalOptions.openedClass
                });
                modalOpenedDeferred.resolve(true);

            }, function resolveError(reason) {
              modalOpenedDeferred.reject(reason);
              modalResultDeferred.reject(reason);
            })
            .finally(function() {
              if (promiseChain === samePromise) {
                promiseChain = null;
              }
            });

            return modalInstance;
          };

          return $modal;
        }
      ]
    };

    return $modalProvider;
  });

/* deprecated modal below */

angular.module('ui.bootstrap.modal')

  .value('$modalSuppressWarning', false)

  /**
   * A helper directive for the $modal service. It creates a backdrop element.
   */
  .directive('modalBackdrop', [
    '$animate', '$injector', '$modalStack', '$log', '$modalSuppressWarning',
    function($animate ,  $injector,   $modalStack, $log, $modalSuppressWarning) {
      var $animateCss = null;

      if ($injector.has('$animateCss')) {
        $animateCss = $injector.get('$animateCss');
      }

      return {
        replace: true,
        templateUrl: 'template/modal/backdrop.html',
        compile: function(tElement, tAttrs) {
          tElement.addClass(tAttrs.backdropClass);
          return linkFn;
        }
      };

      function linkFn(scope, element, attrs) {
        if (!$modalSuppressWarning) {
          $log.warn('modal-backdrop is now deprecated. Use uib-modal-backdrop instead.');
        }
        element.addClass('modal-backdrop');

        if (attrs.modalInClass) {
          if ($animateCss) {
            $animateCss(element, {
              addClass: attrs.modalInClass
            }).start();
          } else {
            $animate.addClass(element, attrs.modalInClass);
          }

          scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
            var done = setIsAsync();
            if ($animateCss) {
              $animateCss(element, {
                removeClass: attrs.modalInClass
              }).start().then(done);
            } else {
              $animate.removeClass(element, attrs.modalInClass).then(done);
            }
          });
        }
      }
    }])

  .directive('modalWindow', [
    '$modalStack', '$q', '$animate', '$injector', '$log', '$modalSuppressWarning',
    function($modalStack ,  $q ,  $animate,   $injector, $log, $modalSuppressWarning) {
      var $animateCss = null;

      if ($injector.has('$animateCss')) {
        $animateCss = $injector.get('$animateCss');
      }

      return {
        scope: {
          index: '@'
        },
        replace: true,
        transclude: true,
        templateUrl: function(tElement, tAttrs) {
          return tAttrs.templateUrl || 'template/modal/window.html';
        },
        link: function(scope, element, attrs) {
          if (!$modalSuppressWarning) {
            $log.warn('modal-window is now deprecated. Use uib-modal-window instead.');
          }
          element.addClass(attrs.windowClass || '');
          element.addClass(attrs.windowTopClass || '');
          scope.size = attrs.size;

          scope.close = function(evt) {
            var modal = $modalStack.getTop();
            if (modal && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
              evt.preventDefault();
              evt.stopPropagation();
              $modalStack.dismiss(modal.key, 'backdrop click');
            }
          };

          // moved from template to fix issue #2280
          element.on('click', scope.close);

          // This property is only added to the scope for the purpose of detecting when this directive is rendered.
          // We can detect that by using this property in the template associated with this directive and then use
          // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
          scope.$isRendered = true;

          // Deferred object that will be resolved when this modal is render.
          var modalRenderDeferObj = $q.defer();
          // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
          // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
          attrs.$observe('modalRender', function(value) {
            if (value == 'true') {
              modalRenderDeferObj.resolve();
            }
          });

          modalRenderDeferObj.promise.then(function() {
            var animationPromise = null;

            if (attrs.modalInClass) {
              if ($animateCss) {
                animationPromise = $animateCss(element, {
                  addClass: attrs.modalInClass
                }).start();
              } else {
                animationPromise = $animate.addClass(element, attrs.modalInClass);
              }

              scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
                var done = setIsAsync();
                if ($animateCss) {
                  $animateCss(element, {
                    removeClass: attrs.modalInClass
                  }).start().then(done);
                } else {
                  $animate.removeClass(element, attrs.modalInClass).then(done);
                }
              });
            }


            $q.when(animationPromise).then(function() {
              var inputWithAutofocus = element[0].querySelector('[autofocus]');
              /**
               * Auto-focusing of a freshly-opened modal element causes any child elements
               * with the autofocus attribute to lose focus. This is an issue on touch
               * based devices which will show and then hide the onscreen keyboard.
               * Attempts to refocus the autofocus element via JavaScript will not reopen
               * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
               * the modal element if the modal does not contain an autofocus element.
               */
              if (inputWithAutofocus) {
                inputWithAutofocus.focus();
              } else {
                element[0].focus();
              }
            });

            // Notify {@link $modalStack} that modal is rendered.
            var modal = $modalStack.getTop();
            if (modal) {
              $modalStack.modalRendered(modal.key);
            }
          });
        }
      };
    }])

  .directive('modalAnimationClass', [
    '$log', '$modalSuppressWarning',
    function ($log, $modalSuppressWarning) {
      return {
        compile: function(tElement, tAttrs) {
          if (!$modalSuppressWarning) {
            $log.warn('modal-animation-class is now deprecated. Use uib-modal-animation-class instead.');
          }
          if (tAttrs.modalAnimation) {
            tElement.addClass(tAttrs.modalAnimationClass);
          }
        }
      };
    }])

  .directive('modalTransclude', [
    '$log', '$modalSuppressWarning',
    function ($log, $modalSuppressWarning) {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        if (!$modalSuppressWarning) {
          $log.warn('modal-transclude is now deprecated. Use uib-modal-transclude instead.');
        }
        $transclude($scope.$parent, function(clone) {
          $element.empty();
          $element.append(clone);
        });
      }
    };
  }])

  .service('$modalStack', [
    '$animate', '$timeout', '$document', '$compile', '$rootScope',
    '$q',
    '$injector',
    '$$multiMap',
    '$$stackedMap',
    '$uibModalStack',
    '$log',
    '$modalSuppressWarning',
    function($animate ,  $timeout ,  $document ,  $compile ,  $rootScope ,
             $q,
             $injector,
             $$multiMap,
             $$stackedMap,
             $uibModalStack,
             $log,
             $modalSuppressWarning) {
      if (!$modalSuppressWarning) {
        $log.warn('$modalStack is now deprecated. Use $uibModalStack instead.');
      }

      angular.extend(this, $uibModalStack);
    }])

  .provider('$modal', ['$uibModalProvider', function($uibModalProvider) {
    angular.extend(this, $uibModalProvider);

    this.$get = ['$injector', '$log', '$modalSuppressWarning',
      function ($injector, $log, $modalSuppressWarning) {
        if (!$modalSuppressWarning) {
          $log.warn('$modal is now deprecated. Use $uibModal instead.');
        }

        return $injector.invoke($uibModalProvider.$get);
      }];
  }]);

angular.module('ui.bootstrap.pagination', [])
.controller('UibPaginationController', ['$scope', '$attrs', '$parse', function($scope, $attrs, $parse) {
  var self = this,
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
      setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

  this.init = function(ngModelCtrl_, config) {
    ngModelCtrl = ngModelCtrl_;
    this.config = config;

    ngModelCtrl.$render = function() {
      self.render();
    };

    if ($attrs.itemsPerPage) {
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
        self.itemsPerPage = parseInt(value, 10);
        $scope.totalPages = self.calculateTotalPages();
      });
    } else {
      this.itemsPerPage = config.itemsPerPage;
    }

    $scope.$watch('totalItems', function() {
      $scope.totalPages = self.calculateTotalPages();
    });

    $scope.$watch('totalPages', function(value) {
      setNumPages($scope.$parent, value); // Readonly variable

      if ( $scope.page > value ) {
        $scope.selectPage(value);
      } else {
        ngModelCtrl.$render();
      }
    });
  };

  this.calculateTotalPages = function() {
    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  };

  this.render = function() {
    $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
  };

  $scope.selectPage = function(page, evt) {
    if (evt) {
      evt.preventDefault();
    }

    var clickAllowed = !$scope.ngDisabled || !evt;
    if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages) {
      if (evt && evt.target) {
        evt.target.blur();
      }
      ngModelCtrl.$setViewValue(page);
      ngModelCtrl.$render();
    }
  };

  $scope.getText = function(key) {
    return $scope[key + 'Text'] || self.config[key + 'Text'];
  };

  $scope.noPrevious = function() {
    return $scope.page === 1;
  };

  $scope.noNext = function() {
    return $scope.page === $scope.totalPages;
  };
}])

.constant('uibPaginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true
})

.directive('uibPagination', ['$parse', 'uibPaginationConfig', function($parse, paginationConfig) {
  return {
    restrict: 'EA',
    scope: {
      totalItems: '=',
      firstText: '@',
      previousText: '@',
      nextText: '@',
      lastText: '@',
      ngDisabled:'='
    },
    require: ['uibPagination', '?ngModel'],
    controller: 'UibPaginationController',
    controllerAs: 'pagination',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/pagination/pagination.html';
    },
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      // Setup configuration parameters
      var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
          rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
      scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
      scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

      paginationCtrl.init(ngModelCtrl, paginationConfig);

      if (attrs.maxSize) {
        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
          maxSize = parseInt(value, 10);
          paginationCtrl.render();
        });
      }

      // Create page object used in template
      function makePage(number, text, isActive) {
        return {
          number: number,
          text: text,
          active: isActive
        };
      }

      function getPages(currentPage, totalPages) {
        var pages = [];

        // Default page limits
        var startPage = 1, endPage = totalPages;
        var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;

        // recompute if maxSize
        if (isMaxSized) {
          if (rotate) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
            endPage   = startPage + maxSize - 1;

            // Adjust if limit is exceeded
            if (endPage > totalPages) {
              endPage   = totalPages;
              startPage = endPage - maxSize + 1;
            }
          } else {
            // Visible pages are paginated with maxSize
            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + maxSize - 1, totalPages);
          }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
          var page = makePage(number, number, number === currentPage);
          pages.push(page);
        }

        // Add links to move between page sets
        if (isMaxSized && ! rotate) {
          if (startPage > 1) {
            var previousPageSet = makePage(startPage - 1, '...', false);
            pages.unshift(previousPageSet);
          }

          if (endPage < totalPages) {
            var nextPageSet = makePage(endPage + 1, '...', false);
            pages.push(nextPageSet);
          }
        }

        return pages;
      }

      var originalRender = paginationCtrl.render;
      paginationCtrl.render = function() {
        originalRender();
        if (scope.page > 0 && scope.page <= scope.totalPages) {
          scope.pages = getPages(scope.page, scope.totalPages);
        }
      };
    }
  };
}])

.constant('uibPagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.directive('uibPager', ['uibPagerConfig', function(pagerConfig) {
  return {
    restrict: 'EA',
    scope: {
      totalItems: '=',
      previousText: '@',
      nextText: '@',
      ngDisabled: '='
    },
    require: ['uibPager', '?ngModel'],
    controller: 'UibPaginationController',
    controllerAs: 'pagination',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/pagination/pager.html';
    },
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
      paginationCtrl.init(ngModelCtrl, pagerConfig);
    }
  };
}]);

/* Deprecated Pagination Below */

angular.module('ui.bootstrap.pagination')
.value('$paginationSuppressWarning', false)
.controller('PaginationController', ['$scope', '$attrs', '$parse', '$log', '$paginationSuppressWarning', function($scope, $attrs, $parse, $log, $paginationSuppressWarning) {
  if (!$paginationSuppressWarning) {
    $log.warn('PaginationController is now deprecated. Use UibPaginationController instead.');
  }

  var self = this,
    ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
    setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

  this.init = function(ngModelCtrl_, config) {
    ngModelCtrl = ngModelCtrl_;
    this.config = config;

    ngModelCtrl.$render = function() {
      self.render();
    };

    if ($attrs.itemsPerPage) {
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
        self.itemsPerPage = parseInt(value, 10);
        $scope.totalPages = self.calculateTotalPages();
      });
    } else {
      this.itemsPerPage = config.itemsPerPage;
    }

    $scope.$watch('totalItems', function() {
      $scope.totalPages = self.calculateTotalPages();
    });

    $scope.$watch('totalPages', function(value) {
      setNumPages($scope.$parent, value); // Readonly variable

      if ( $scope.page > value ) {
        $scope.selectPage(value);
      } else {
        ngModelCtrl.$render();
      }
    });
  };

  this.calculateTotalPages = function() {
    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  };

  this.render = function() {
    $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
  };

  $scope.selectPage = function(page, evt) {
    if (evt) {
      evt.preventDefault();
    }

    var clickAllowed = !$scope.ngDisabled || !evt;
    if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages) {
      if (evt && evt.target) {
        evt.target.blur();
      }
      ngModelCtrl.$setViewValue(page);
      ngModelCtrl.$render();
    }
  };

  $scope.getText = function(key) {
    return $scope[key + 'Text'] || self.config[key + 'Text'];
  };

  $scope.noPrevious = function() {
    return $scope.page === 1;
  };

  $scope.noNext = function() {
    return $scope.page === $scope.totalPages;
  };
}])
.directive('pagination', ['$parse', 'uibPaginationConfig', '$log', '$paginationSuppressWarning', function($parse, paginationConfig, $log, $paginationSuppressWarning) {
  return {
    restrict: 'EA',
    scope: {
      totalItems: '=',
      firstText: '@',
      previousText: '@',
      nextText: '@',
      lastText: '@',
      ngDisabled:'='
    },
    require: ['pagination', '?ngModel'],
    controller: 'PaginationController',
    controllerAs: 'pagination',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/pagination/pagination.html';
    },
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      if (!$paginationSuppressWarning) {
        $log.warn('pagination is now deprecated. Use uib-pagination instead.');
      }
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      // Setup configuration parameters
      var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
          rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
      scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
      scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

      paginationCtrl.init(ngModelCtrl, paginationConfig);

      if (attrs.maxSize) {
        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
          maxSize = parseInt(value, 10);
          paginationCtrl.render();
        });
      }

      // Create page object used in template
      function makePage(number, text, isActive) {
        return {
          number: number,
          text: text,
          active: isActive
        };
      }

      function getPages(currentPage, totalPages) {
        var pages = [];

        // Default page limits
        var startPage = 1, endPage = totalPages;
        var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;

        // recompute if maxSize
        if (isMaxSized) {
          if (rotate) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
            endPage   = startPage + maxSize - 1;

            // Adjust if limit is exceeded
            if (endPage > totalPages) {
              endPage   = totalPages;
              startPage = endPage - maxSize + 1;
            }
          } else {
            // Visible pages are paginated with maxSize
            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + maxSize - 1, totalPages);
          }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
          var page = makePage(number, number, number === currentPage);
          pages.push(page);
        }

        // Add links to move between page sets
        if (isMaxSized && ! rotate) {
          if (startPage > 1) {
            var previousPageSet = makePage(startPage - 1, '...', false);
            pages.unshift(previousPageSet);
          }

          if (endPage < totalPages) {
            var nextPageSet = makePage(endPage + 1, '...', false);
            pages.push(nextPageSet);
          }
        }

        return pages;
      }

      var originalRender = paginationCtrl.render;
      paginationCtrl.render = function() {
        originalRender();
        if (scope.page > 0 && scope.page <= scope.totalPages) {
          scope.pages = getPages(scope.page, scope.totalPages);
        }
      };
    }
  };
}])

.directive('pager', ['uibPagerConfig', '$log', '$paginationSuppressWarning', function(pagerConfig, $log, $paginationSuppressWarning) {
  return {
    restrict: 'EA',
    scope: {
      totalItems: '=',
      previousText: '@',
      nextText: '@',
      ngDisabled: '='
    },
    require: ['pager', '?ngModel'],
    controller: 'PaginationController',
    controllerAs: 'pagination',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/pagination/pager.html';
    },
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      if (!$paginationSuppressWarning) {
        $log.warn('pager is now deprecated. Use uib-pager instead.');
      }
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
      paginationCtrl.init(ngModelCtrl, pagerConfig);
    }
  };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position', 'ui.bootstrap.stackedMap'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$uibTooltip', function() {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    animation: true,
    popupDelay: 0,
    popupCloseDelay: 0,
    useContentExp: false
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'focus': 'blur',
    'none': ''
  };

  // The options specified to the provider globally.
  var globalOptions = {};

  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
	this.options = function(value) {
		angular.extend(globalOptions, value);
	};

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
   */
  this.setTriggers = function setTriggers(triggers) {
    angular.extend(triggerMap, triggers);
  };

  /**
   * This is a helper function for translating camel-case to snake-case.
   */
  function snake_case(name) {
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = ['$window', '$compile', '$timeout', '$document', '$uibPosition', '$interpolate', '$rootScope', '$parse', '$$stackedMap', function($window, $compile, $timeout, $document, $position, $interpolate, $rootScope, $parse, $$stackedMap) {
    var openedTooltips = $$stackedMap.createNew();
    $document.on('keypress', function(e) {
      if (e.which === 27) {
        var last = openedTooltips.top();
        if (last) {
          last.value.close();
          openedTooltips.removeTop();
          last = null;
        }
      }
    });

    return function $tooltip(ttType, prefix, defaultTriggerShow, options) {
      options = angular.extend({}, defaultOptions, globalOptions, options);

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers(trigger) {
        var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
        var hide = show.map(function(trigger) {
          return triggerMap[trigger] || trigger;
        });
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case(ttType);

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template =
        '<div '+ directiveName + '-popup '+
          'title="' + startSym + 'title' + endSym + '" '+
          (options.useContentExp ?
            'content-exp="contentExp()" ' :
            'content="' + startSym + 'content' + endSym + '" ') +
          'placement="' + startSym + 'placement' + endSym + '" '+
          'popup-class="' + startSym + 'popupClass' + endSym + '" '+
          'animation="animation" ' +
          'is-open="isOpen"' +
          'origin-scope="origScope" ' +
          'style="visibility: hidden; display: block; top: -9999px; left: -9999px;"' +
          '>' +
        '</div>';

      return {
        compile: function(tElem, tAttrs) {
          var tooltipLinker = $compile(template);

          return function link(scope, element, attrs, tooltipCtrl) {
            var tooltip;
            var tooltipLinkedScope;
            var transitionTimeout;
            var showTimeout;
            var hideTimeout;
            var positionTimeout;
            var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
            var triggers = getTriggers(undefined);
            var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
            var ttScope = scope.$new(true);
            var repositionScheduled = false;
            var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
            var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
            var observers = [];

            var positionTooltip = function() {
              // check if tooltip exists and is not empty
              if (!tooltip || !tooltip.html()) { return; }

              if (!positionTimeout) {
                positionTimeout = $timeout(function() {
                  // Reset the positioning.
                  tooltip.css({ top: 0, left: 0 });

                  // Now set the calculated positioning.
                  var ttCss = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
                  ttCss.top += 'px';
                  ttCss.left += 'px';
                  ttCss.visibility = 'visible';
                  tooltip.css(ttCss);

                  positionTimeout = null;
                }, 0, false);
              }
            };

            // Set up the correct scope to allow transclusion later
            ttScope.origScope = scope;

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            ttScope.isOpen = false;
            openedTooltips.add(ttScope, {
              close: hide
            });

            function toggleTooltipBind() {
              if (!ttScope.isOpen) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                return;
              }

              cancelHide();
              prepareTooltip();

              if (ttScope.popupDelay) {
                // Do nothing if the tooltip was already scheduled to pop-up.
                // This happens if show is triggered multiple times before any hide is triggered.
                if (!showTimeout) {
                  showTimeout = $timeout(show, ttScope.popupDelay, false);
                }
              } else {
                show();
              }
            }

            function hideTooltipBind() {
              cancelShow();

              if (ttScope.popupCloseDelay) {
                if (!hideTimeout) {
                  hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                }
              } else {
                hide();
              }
            }

            // Show the tooltip popup element.
            function show() {
              cancelShow();
              cancelHide();

              // Don't show empty tooltips.
              if (!ttScope.content) {
                return angular.noop;
              }

              createTooltip();

              // And show the tooltip.
              ttScope.$evalAsync(function() {
                ttScope.isOpen = true;
                assignIsOpen(true);
                positionTooltip();
              });
            }

            function cancelShow() {
              if (showTimeout) {
                $timeout.cancel(showTimeout);
                showTimeout = null;
              }

              if (positionTimeout) {
                $timeout.cancel(positionTimeout);
                positionTimeout = null;
              }
            }

            // Hide the tooltip popup element.
            function hide() {
              cancelShow();
              cancelHide();

              if (!ttScope) {
                return;
              }

              // First things first: we don't show it anymore.
              ttScope.$evalAsync(function() {
                ttScope.isOpen = false;
                assignIsOpen(false);
                // And now we remove it from the DOM. However, if we have animation, we
                // need to wait for it to expire beforehand.
                // FIXME: this is a placeholder for a port of the transitions library.
                // The fade transition in TWBS is 150ms.
                if (ttScope.animation) {
                  if (!transitionTimeout) {
                    transitionTimeout = $timeout(removeTooltip, 150, false);
                  }
                } else {
                  removeTooltip();
                }
              });
            }

            function cancelHide() {
              if (hideTimeout) {
                $timeout.cancel(hideTimeout);
                hideTimeout = null;
              }
              if (transitionTimeout) {
                $timeout.cancel(transitionTimeout);
                transitionTimeout = null;
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                return;
              }

              tooltipLinkedScope = ttScope.$new();
              tooltip = tooltipLinker(tooltipLinkedScope, function(tooltip) {
                if (appendToBody) {
                  $document.find('body').append(tooltip);
                } else {
                  element.after(tooltip);
                }
              });

              prepObservers();
            }

            function removeTooltip() {
              unregisterObservers();

              transitionTimeout = null;
              if (tooltip) {
                tooltip.remove();
                tooltip = null;
              }
              if (tooltipLinkedScope) {
                tooltipLinkedScope.$destroy();
                tooltipLinkedScope = null;
              }
            }

            /**
             * Set the inital scope values. Once
             * the tooltip is created, the observers
             * will be added to keep things in synch.
             */
            function prepareTooltip() {
              ttScope.title = attrs[prefix + 'Title'];
              if (contentParse) {
                ttScope.content = contentParse(scope);
              } else {
                ttScope.content = attrs[ttType];
              }

              ttScope.popupClass = attrs[prefix + 'Class'];
              ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;

              var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
              var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
              ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
              ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
            }

            function assignIsOpen(isOpen) {
              if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                isOpenParse.assign(scope, isOpen);
              }
            }

            ttScope.contentExp = function() {
              return ttScope.content;
            };

            /**
             * Observe the relevant attributes.
             */
            attrs.$observe('disabled', function(val) {
              if (val) {
                cancelShow();
              }

              if (val && ttScope.isOpen) {
                hide();
              }
            });

            if (isOpenParse) {
              scope.$watch(isOpenParse, function(val) {
                /*jshint -W018 */
                if (ttScope && !val === ttScope.isOpen) {
                  toggleTooltipBind();
                }
                /*jshint +W018 */
              });
            }

            function prepObservers() {
              observers.length = 0;

              if (contentParse) {
                observers.push(
                  scope.$watch(contentParse, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    }
                  })
                );

                observers.push(
                  tooltipLinkedScope.$watch(function() {
                    if (!repositionScheduled) {
                      repositionScheduled = true;
                      tooltipLinkedScope.$$postDigest(function() {
                        repositionScheduled = false;
                        if (ttScope && ttScope.isOpen) {
                          positionTooltip();
                        }
                      });
                    }
                  })
                );
              } else {
                observers.push(
                  attrs.$observe(ttType, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    } else {
                      positionTooltip();
                    }
                  })
                );
              }

              observers.push(
                attrs.$observe(prefix + 'Title', function(val) {
                  ttScope.title = val;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );

              observers.push(
                attrs.$observe(prefix + 'Placement', function(val) {
                  ttScope.placement = val ? val : options.placement;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );
            }

            function unregisterObservers() {
              if (observers.length) {
                angular.forEach(observers, function(observer) {
                  observer();
                });
                observers.length = 0;
              }
            }

            var unregisterTriggers = function() {
              triggers.show.forEach(function(trigger) {
                element.unbind(trigger, showTooltipBind);
              });
              triggers.hide.forEach(function(trigger) {
                trigger.split(' ').forEach(function(hideTrigger) {
                  element[0].removeEventListener(hideTrigger, hideTooltipBind);
                });
              });
            };

            function prepTriggers() {
              var val = attrs[prefix + 'Trigger'];
              unregisterTriggers();

              triggers = getTriggers(val);

              if (triggers.show !== 'none') {
                triggers.show.forEach(function(trigger, idx) {
                  // Using raw addEventListener due to jqLite/jQuery bug - #4060
                  if (trigger === triggers.hide[idx]) {
                    element[0].addEventListener(trigger, toggleTooltipBind);
                  } else if (trigger) {
                    element[0].addEventListener(trigger, showTooltipBind);
                    triggers.hide[idx].split(' ').forEach(function(trigger) {
                      element[0].addEventListener(trigger, hideTooltipBind);
                    });
                  }

                  element.on('keypress', function(e) {
                    if (e.which === 27) {
                      hideTooltipBind();
                    }
                  });
                });
              }
            }

            prepTriggers();

            var animation = scope.$eval(attrs[prefix + 'Animation']);
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

            var appendToBodyVal = scope.$eval(attrs[prefix + 'AppendToBody']);
            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

            // if a tooltip is attached to <body> we need to remove it on
            // location change as its parent scope will probably not be destroyed
            // by the change.
            if (appendToBody) {
              scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess() {
                if (ttScope.isOpen) {
                  hide();
                }
              });
            }

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              cancelShow();
              cancelHide();
              unregisterTriggers();
              removeTooltip();
              openedTooltips.remove(ttScope);
              ttScope = null;
            });
          };
        }
      };
    };
  }];
})

// This is mostly ngInclude code but with a custom scope
.directive('uibTooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest',
function ($animate ,  $sce ,  $compile ,  $templateRequest) {
  return {
    link: function(scope, elem, attrs) {
      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }

        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }

        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.uibTooltipTemplateTransclude), function(src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

/**
 * Note that it's intentional that these classes are *not* applied through $animate.
 * They must not be animated as they're expected to be present on the tooltip on
 * initialization.
 */
.directive('uibTooltipClasses', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (scope.placement) {
        element.addClass(scope.placement);
      }

      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }

      if (scope.animation()) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
})

.directive('uibTooltipPopup', function() {
  return {
    replace: true,
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html',
    link: function(scope, element) {
      element.addClass('tooltip');
    }
  };
})

.directive('uibTooltip', [ '$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltip', 'tooltip', 'mouseenter');
}])

.directive('uibTooltipTemplatePopup', function() {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/tooltip/tooltip-template-popup.html',
    link: function(scope, element) {
      element.addClass('tooltip');
    }
  };
})

.directive('uibTooltipTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive('uibTooltipHtmlPopup', function() {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-popup.html',
    link: function(scope, element) {
      element.addClass('tooltip');
    }
  };
})

.directive('uibTooltipHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibTooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}]);

/* Deprecated tooltip below */

angular.module('ui.bootstrap.tooltip')

.value('$tooltipSuppressWarning', false)

.provider('$tooltip', ['$uibTooltipProvider', function($uibTooltipProvider) {
  angular.extend(this, $uibTooltipProvider);

  this.$get = ['$log', '$tooltipSuppressWarning', '$injector', function($log, $tooltipSuppressWarning, $injector) {
    if (!$tooltipSuppressWarning) {
      $log.warn('$tooltip is now deprecated. Use $uibTooltip instead.');
    }

    return $injector.invoke($uibTooltipProvider.$get);
  }];
}])

// This is mostly ngInclude code but with a custom scope
.directive('tooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest', '$log', '$tooltipSuppressWarning',
function ($animate ,  $sce ,  $compile ,  $templateRequest,   $log,   $tooltipSuppressWarning) {
  return {
    link: function(scope, elem, attrs) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-template-transclude is now deprecated. Use uib-tooltip-template-transclude instead.');
      }

      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }
        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }
        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.tooltipTemplateTransclude), function(src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

.directive('tooltipClasses', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-classes is now deprecated. Use uib-tooltip-classes instead.');
      }

      if (scope.placement) {
        element.addClass(scope.placement);
      }
      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }
      if (scope.animation()) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
}])

.directive('tooltipPopup', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    replace: true,
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html',
    link: function(scope, element) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-popup is now deprecated. Use uib-tooltip-popup instead.');
      }

      element.addClass('tooltip');
    }
  };
}])

.directive('tooltip', ['$tooltip', function($tooltip) {
  return $tooltip('tooltip', 'tooltip', 'mouseenter');
}])

.directive('tooltipTemplatePopup', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/tooltip/tooltip-template-popup.html',
    link: function(scope, element) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-template-popup is now deprecated. Use uib-tooltip-template-popup instead.');
      }

      element.addClass('tooltip');
    }
  };
}])

.directive('tooltipTemplate', ['$tooltip', function($tooltip) {
  return $tooltip('tooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive('tooltipHtmlPopup', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-popup.html',
    link: function(scope, element) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-html-popup is now deprecated. Use uib-tooltip-html-popup instead.');
      }

      element.addClass('tooltip');
    }
  };
}])

.directive('tooltipHtml', ['$tooltip', function($tooltip) {
  return $tooltip('tooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, and selector delegatation.
 */
angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])

.directive('uibPopoverTemplatePopup', function() {
  return {
    replace: true,
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/popover/popover-template.html',
    link: function(scope, element) {
      element.addClass('popover');
    }
  };
})

.directive('uibPopoverTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverHtmlPopup', function() {
  return {
    replace: true,
    scope: { contentExp: '&', title: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover-html.html',
    link: function(scope, element) {
      element.addClass('popover');
    }
  };
})

.directive('uibPopoverHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverPopup', function() {
  return {
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html',
    link: function(scope, element) {
      element.addClass('popover');
    }
  };
})

.directive('uibPopover', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopover', 'popover', 'click');
}]);

/* Deprecated popover below */

angular.module('ui.bootstrap.popover')

.value('$popoverSuppressWarning', false)

.directive('popoverTemplatePopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/popover/popover-template.html',
    link: function(scope, element) {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-template-popup is now deprecated. Use uib-popover-template-popup instead.');
      }

      element.addClass('popover');
    }
  };
}])

.directive('popoverTemplate', ['$tooltip', function($tooltip) {
  return $tooltip('popoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('popoverHtmlPopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { contentExp: '&', title: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover-html.html',
    link: function(scope, element) {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-html-popup is now deprecated. Use uib-popover-html-popup instead.');
      }

      element.addClass('popover');
    }
  };
}])

.directive('popoverHtml', ['$tooltip', function($tooltip) {
  return $tooltip('popoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('popoverPopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html',
    link: function(scope, element) {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-popup is now deprecated. Use uib-popover-popup instead.');
      }

      element.addClass('popover');
    }
  };
}])

.directive('popover', ['$tooltip', function($tooltip) {

  return $tooltip('popover', 'popover', 'click');
}]);

angular.module('ui.bootstrap.progressbar', [])

.constant('uibProgressConfig', {
  animate: true,
  max: 100
})

.controller('UibProgressController', ['$scope', '$attrs', 'uibProgressConfig', function($scope, $attrs, progressConfig) {
  var self = this,
      animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = angular.isDefined($scope.max) ? $scope.max : progressConfig.max;

  this.addBar = function(bar, element, attrs) {
    if (!animate) {
      element.css({'transition': 'none'});
    }

    this.bars.push(bar);

    bar.max = $scope.max;
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function(value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function() {
      var totalPercentage = self.bars.reduce(function(total, bar) {
        bar.percent = +(100 * bar.value / bar.max).toFixed(2);
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function() {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function(bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
    this.bars.forEach(function (bar) {
      bar.recalculatePercentage();
    });
  };

  $scope.$watch('max', function(max) {
    self.bars.forEach(function(bar) {
      bar.max = $scope.max;
      bar.recalculatePercentage();
    });
  });
}])

.directive('uibProgress', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    require: 'uibProgress',
    scope: {
      max: '=?'
    },
    templateUrl: 'template/progressbar/progress.html'
  };
})

.directive('uibBar', function() {
  return {
    replace: true,
    transclude: true,
    require: '^uibProgress',
    scope: {
      value: '=',
      type: '@'
    },
    templateUrl: 'template/progressbar/bar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, element, attrs);
    }
  };
})

.directive('uibProgressbar', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'UibProgressController',
    scope: {
      value: '=',
      max: '=?',
      type: '@'
    },
    templateUrl: 'template/progressbar/progressbar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
    }
  };
});

/* Deprecated progressbar below */

angular.module('ui.bootstrap.progressbar')

.value('$progressSuppressWarning', false)

.controller('ProgressController', ['$scope', '$attrs', 'uibProgressConfig', '$log', '$progressSuppressWarning', function($scope, $attrs, progressConfig, $log, $progressSuppressWarning) {
  if (!$progressSuppressWarning) {
    $log.warn('ProgressController is now deprecated. Use UibProgressController instead.');
  }

  var self = this,
    animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = angular.isDefined($scope.max) ? $scope.max : progressConfig.max;

  this.addBar = function(bar, element, attrs) {
    if (!animate) {
      element.css({'transition': 'none'});
    }

    this.bars.push(bar);

    bar.max = $scope.max;
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function(value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function() {
      bar.percent = +(100 * bar.value / bar.max).toFixed(2);

      var totalPercentage = self.bars.reduce(function(total, bar) {
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function() {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function(bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
  };

  $scope.$watch('max', function(max) {
    self.bars.forEach(function(bar) {
      bar.max = $scope.max;
      bar.recalculatePercentage();
    });
  });
}])

.directive('progress', ['$log', '$progressSuppressWarning', function($log, $progressSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    controller: 'ProgressController',
    require: 'progress',
    scope: {
      max: '=?',
      title: '@?'
    },
    templateUrl: 'template/progressbar/progress.html',
    link: function() {
      if (!$progressSuppressWarning) {
        $log.warn('progress is now deprecated. Use uib-progress instead.');
      }
    }
  };
}])

.directive('bar', ['$log', '$progressSuppressWarning', function($log, $progressSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    require: '^progress',
    scope: {
      value: '=',
      type: '@'
    },
    templateUrl: 'template/progressbar/bar.html',
    link: function(scope, element, attrs, progressCtrl) {
      if (!$progressSuppressWarning) {
        $log.warn('bar is now deprecated. Use uib-bar instead.');
      }
      progressCtrl.addBar(scope, element);
    }
  };
}])

.directive('progressbar', ['$log', '$progressSuppressWarning', function($log, $progressSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    controller: 'ProgressController',
    scope: {
      value: '=',
      max: '=?',
      type: '@'
    },
    templateUrl: 'template/progressbar/progressbar.html',
    link: function(scope, element, attrs, progressCtrl) {
      if (!$progressSuppressWarning) {
        $log.warn('progressbar is now deprecated. Use uib-progressbar instead.');
      }
      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
    }
  };
}]);

angular.module('ui.bootstrap.rating', [])

.constant('uibRatingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null,
  titles : ['one', 'two', 'three', 'four', 'five']
})

.controller('UibRatingController', ['$scope', '$attrs', 'uibRatingConfig', function($scope, $attrs, ratingConfig) {
  var ngModelCtrl  = { $setViewValue: angular.noop };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.push(function(value) {
      if (angular.isNumber(value) && value << 0 !== value) {
        value = Math.round(value);
      }
      return value;
    });

    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    var tmpTitles = angular.isDefined($attrs.titles)  ? $scope.$parent.$eval($attrs.titles) : ratingConfig.titles ;
    this.titles = angular.isArray(tmpTitles) && tmpTitles.length > 0 ?
      tmpTitles : ratingConfig.titles;

    var ratingStates = angular.isDefined($attrs.ratingStates) ?
      $scope.$parent.$eval($attrs.ratingStates) :
      new Array(angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max);
    $scope.range = this.buildTemplateObjects(ratingStates);
  };

  this.buildTemplateObjects = function(states) {
    for (var i = 0, n = states.length; i < n; i++) {
      states[i] = angular.extend({ index: i }, { stateOn: this.stateOn, stateOff: this.stateOff, title: this.getTitle(i) }, states[i]);
    }
    return states;
  };

  this.getTitle = function(index) {
    if (index >= this.titles.length) {
      return index + 1;
    } else {
      return this.titles[index];
    }
  };

  $scope.rate = function(value) {
    if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
      ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue === value ? 0 : value);
      ngModelCtrl.$render();
    }
  };

  $scope.enter = function(value) {
    if (!$scope.readonly) {
      $scope.value = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.onLeave();
  };

  $scope.onKeydown = function(evt) {
    if (/(37|38|39|40)/.test(evt.which)) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1));
    }
  };

  this.render = function() {
    $scope.value = ngModelCtrl.$viewValue;
  };
}])

.directive('uibRating', function() {
  return {
    require: ['uibRating', 'ngModel'],
    scope: {
      readonly: '=?',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'UibRatingController',
    templateUrl: 'template/rating/rating.html',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      ratingCtrl.init(ngModelCtrl);
    }
  };
});

/* Deprecated rating below */

angular.module('ui.bootstrap.rating')

.value('$ratingSuppressWarning', false)

.controller('RatingController', ['$scope', '$attrs', '$controller', '$log', '$ratingSuppressWarning', function($scope, $attrs, $controller, $log, $ratingSuppressWarning) {
  if (!$ratingSuppressWarning) {
    $log.warn('RatingController is now deprecated. Use UibRatingController instead.');
  }

  angular.extend(this, $controller('UibRatingController', {
    $scope: $scope,
    $attrs: $attrs
  }));
}])

.directive('rating', ['$log', '$ratingSuppressWarning', function($log, $ratingSuppressWarning) {
  return {
    require: ['rating', 'ngModel'],
    scope: {
      readonly: '=?',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'RatingController',
    templateUrl: 'template/rating/rating.html',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      if (!$ratingSuppressWarning) {
        $log.warn('rating is now deprecated. Use uib-rating instead.');
      }
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      ratingCtrl.init(ngModelCtrl);
    }
  };
}]);


/**
 * @ngdoc overview
 * @name ui.bootstrap.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('ui.bootstrap.tabs', [])

.controller('UibTabsetController', ['$scope', function ($scope) {
  var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function(selectedTab) {
    angular.forEach(tabs, function(tab) {
      if (tab.active && tab !== selectedTab) {
        tab.active = false;
        tab.onDeselect();
        selectedTab.selectCalled = false;
      }
    });
    selectedTab.active = true;
    // only call select if it has not already been called
    if (!selectedTab.selectCalled) {
      selectedTab.onSelect();
      selectedTab.selectCalled = true;
    }
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    // we can't run the select function on the first tab
    // since that would select it twice
    if (tabs.length === 1 && tab.active !== false) {
      tab.active = true;
    } else if (tab.active) {
      ctrl.select(tab);
    } else {
      tab.active = false;
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && tabs.length > 1 && !destroyed) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };

  var destroyed;
  $scope.$on('$destroy', function() {
    destroyed = true;
  });
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <uib-tabset>
      <uib-tab heading="Tab 1"><b>First</b> Content!</uib-tab>
      <uib-tab heading="Tab 2"><i>Second</i> Content!</uib-tab>
    </uib-tabset>
    <hr />
    <uib-tabset vertical="true">
      <uib-tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</uib-tab>
      <uib-tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</uib-tab>
    </uib-tabset>
    <uib-tabset justified="true">
      <uib-tab heading="Justified Tab 1"><b>First</b> Justified Content!</uib-tab>
      <uib-tab heading="Justified Tab 2"><i>Second</i> Justified Content!</uib-tab>
    </uib-tabset>
  </file>
</example>
 */
.directive('uibTabset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@'
    },
    controller: 'UibTabsetController',
    templateUrl: 'template/tabs/tabset.html',
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
    }
  };
})

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link ui.bootstrap.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link ui.bootstrap.tabs.directive:tabset tabset}.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <div ng-controller="TabsDemoCtrl">
      <button class="btn btn-small" ng-click="items[0].active = true">
        Select item 1, using active binding
      </button>
      <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">
        Enable/disable item 2, using disabled binding
      </button>
      <br />
      <uib-tabset>
        <uib-tab heading="Tab 1">First Tab</uib-tab>
        <uib-tab select="alertMe()">
          <uib-tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>
          Second Tab, with alert callback and html heading!
        </uib-tab>
        <uib-tab ng-repeat="item in items"
          heading="{{item.title}}"
          disabled="item.disabled"
          active="item.active">
          {{item.content}}
        </uib-tab>
      </uib-tabset>
    </div>
  </file>
  <file name="script.js">
    function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
  </file>
</example>
 */

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link ui.bootstrap.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <uib-tabset>
      <uib-tab>
        <uib-tab-heading><b>HTML</b> in my titles?!</tab-heading>
        And some content, too!
      </uib-tab>
      <uib-tab>
        <uib-tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>
        That's right.
      </uib-tab>
    </uib-tabset>
  </file>
</example>
 */
.directive('uibTab', ['$parse', function($parse) {
  return {
    require: '^uibTabset',
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/tabs/tab.html',
    transclude: true,
    scope: {
      active: '=?',
      heading: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    link: function(scope, elm, attrs, tabsetCtrl, transclude) {
      scope.$watch('active', function(active) {
        if (active) {
          tabsetCtrl.select(scope);
        }
      });

      scope.disabled = false;
      if (attrs.disable) {
        scope.$parent.$watch($parse(attrs.disable), function(value) {
          scope.disabled = !! value;
        });
      }

      scope.select = function() {
        if (!scope.disabled) {
          scope.active = true;
        }
      };

      tabsetCtrl.addTab(scope);
      scope.$on('$destroy', function() {
        tabsetCtrl.removeTab(scope);
      });

      //We need to transclude later, once the content container is ready.
      //when this link happens, we're inside a tab heading.
      scope.$transcludeFn = transclude;
    }
  };
}])

.directive('uibTabHeadingTransclude', function() {
  return {
    restrict: 'A',
    require: ['?^uibTab', '?^tab'], // TODO: change to '^uibTab' after deprecation removal
    link: function(scope, elm) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
})

.directive('uibTabContentTransclude', function() {
  return {
    restrict: 'A',
    require: ['?^uibTabset', '?^tabset'], // TODO: change to '^uibTabset' after deprecation removal
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.uibTabContentTransclude);

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };

  function isTabHeading(node) {
    return node.tagName && (
      node.hasAttribute('tab-heading') || // TODO: remove after deprecation removal
      node.hasAttribute('data-tab-heading') || // TODO: remove after deprecation removal
      node.hasAttribute('x-tab-heading') || // TODO: remove after deprecation removal
      node.hasAttribute('uib-tab-heading') ||
      node.hasAttribute('data-uib-tab-heading') ||
      node.hasAttribute('x-uib-tab-heading') ||
      node.tagName.toLowerCase() === 'tab-heading' || // TODO: remove after deprecation removal
      node.tagName.toLowerCase() === 'data-tab-heading' || // TODO: remove after deprecation removal
      node.tagName.toLowerCase() === 'x-tab-heading' || // TODO: remove after deprecation removal
      node.tagName.toLowerCase() === 'uib-tab-heading' ||
      node.tagName.toLowerCase() === 'data-uib-tab-heading' ||
      node.tagName.toLowerCase() === 'x-uib-tab-heading'
    );
  }
});

/* deprecated tabs below */

angular.module('ui.bootstrap.tabs')

  .value('$tabsSuppressWarning', false)

  .controller('TabsetController', ['$scope', '$controller', '$log', '$tabsSuppressWarning', function($scope, $controller, $log, $tabsSuppressWarning) {
    if (!$tabsSuppressWarning) {
      $log.warn('TabsetController is now deprecated. Use UibTabsetController instead.');
    }

    angular.extend(this, $controller('UibTabsetController', {
      $scope: $scope
    }));
  }])

  .directive('tabset', ['$log', '$tabsSuppressWarning', function($log, $tabsSuppressWarning) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        type: '@'
      },
      controller: 'TabsetController',
      templateUrl: 'template/tabs/tabset.html',
      link: function(scope, element, attrs) {

        if (!$tabsSuppressWarning) {
          $log.warn('tabset is now deprecated. Use uib-tabset instead.');
        }
        scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
        scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
      }
    };
  }])

  .directive('tab', ['$parse', '$log', '$tabsSuppressWarning', function($parse, $log, $tabsSuppressWarning) {
    return {
      require: '^tabset',
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/tabs/tab.html',
      transclude: true,
      scope: {
        active: '=?',
        heading: '@',
        onSelect: '&select', //This callback is called in contentHeadingTransclude
        //once it inserts the tab's content into the dom
        onDeselect: '&deselect'
      },
      controller: function() {
        //Empty controller so other directives can require being 'under' a tab
      },
      link: function(scope, elm, attrs, tabsetCtrl, transclude) {
        if (!$tabsSuppressWarning) {
          $log.warn('tab is now deprecated. Use uib-tab instead.');
        }

        scope.$watch('active', function(active) {
          if (active) {
            tabsetCtrl.select(scope);
          }
        });

        scope.disabled = false;
        if (attrs.disable) {
          scope.$parent.$watch($parse(attrs.disable), function(value) {
            scope.disabled = !!value;
          });
        }

        scope.select = function() {
          if (!scope.disabled) {
            scope.active = true;
          }
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      }
    };
  }])

  .directive('tabHeadingTransclude', ['$log', '$tabsSuppressWarning', function($log, $tabsSuppressWarning) {
    return {
      restrict: 'A',
      require: '^tab',
      link: function(scope, elm) {
        if (!$tabsSuppressWarning) {
          $log.warn('tab-heading-transclude is now deprecated. Use uib-tab-heading-transclude instead.');
        }

        scope.$watch('headingElement', function updateHeadingElement(heading) {
          if (heading) {
            elm.html('');
            elm.append(heading);
          }
        });
      }
    };
  }])

  .directive('tabContentTransclude', ['$log', '$tabsSuppressWarning', function($log, $tabsSuppressWarning) {
    return {
      restrict: 'A',
      require: '^tabset',
      link: function(scope, elm, attrs) {
        if (!$tabsSuppressWarning) {
          $log.warn('tab-content-transclude is now deprecated. Use uib-tab-content-transclude instead.');
        }

        var tab = scope.$eval(attrs.tabContentTransclude);

        //Now our tab is ready to be transcluded: both the tab heading area
        //and the tab content area are loaded.  Transclude 'em both.
        tab.$transcludeFn(tab.$parent, function(contents) {
          angular.forEach(contents, function(node) {
            if (isTabHeading(node)) {
              //Let tabHeadingTransclude know.
              tab.headingElement = node;
            }
            else {
              elm.append(node);
            }
          });
        });
      }
    };

    function isTabHeading(node) {
      return node.tagName && (
          node.hasAttribute('tab-heading') ||
          node.hasAttribute('data-tab-heading') ||
          node.hasAttribute('x-tab-heading') ||
          node.tagName.toLowerCase() === 'tab-heading' ||
          node.tagName.toLowerCase() === 'data-tab-heading' ||
          node.tagName.toLowerCase() === 'x-tab-heading'
        );
    }
  }]);

angular.module('ui.bootstrap.timepicker', [])

.constant('uibTimepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: true,
  meridians: null,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: true
})

.controller('UibTimepickerController', ['$scope', '$element', '$attrs', '$parse', '$log', '$locale', 'uibTimepickerConfig', function($scope, $element, $attrs, $parse, $log, $locale, timepickerConfig) {
  var selected = new Date(),
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
      meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS;

  $scope.tabindex = angular.isDefined($attrs.tabindex) ? $attrs.tabindex : 0;
  $element.removeAttr('tabindex');

  this.init = function(ngModelCtrl_, inputs) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.unshift(function(modelValue) {
      return modelValue ? new Date(modelValue) : null;
    });

    var hoursInputEl = inputs.eq(0),
        minutesInputEl = inputs.eq(1);

    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;
    if (mousewheel) {
      this.setupMousewheelEvents(hoursInputEl, minutesInputEl);
    }

    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
    if (arrowkeys) {
      this.setupArrowkeyEvents(hoursInputEl, minutesInputEl);
    }

    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
    this.setupInputEvents(hoursInputEl, minutesInputEl);
  };

  var hourStep = timepickerConfig.hourStep;
  if ($attrs.hourStep) {
    $scope.$parent.$watch($parse($attrs.hourStep), function(value) {
      hourStep = parseInt(value, 10);
    });
  }

  var minuteStep = timepickerConfig.minuteStep;
  if ($attrs.minuteStep) {
    $scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
      minuteStep = parseInt(value, 10);
    });
  }

  var min;
  $scope.$parent.$watch($parse($attrs.min), function(value) {
    var dt = new Date(value);
    min = isNaN(dt) ? undefined : dt;
  });

  var max;
  $scope.$parent.$watch($parse($attrs.max), function(value) {
    var dt = new Date(value);
    max = isNaN(dt) ? undefined : dt;
  });

  $scope.noIncrementHours = function() {
    var incrementedSelected = addMinutes(selected, hourStep * 60);
    return incrementedSelected > max ||
      (incrementedSelected < selected && incrementedSelected < min);
  };

  $scope.noDecrementHours = function() {
    var decrementedSelected = addMinutes(selected, -hourStep * 60);
    return decrementedSelected < min ||
      (decrementedSelected > selected && decrementedSelected > max);
  };

  $scope.noIncrementMinutes = function() {
    var incrementedSelected = addMinutes(selected, minuteStep);
    return incrementedSelected > max ||
      (incrementedSelected < selected && incrementedSelected < min);
  };

  $scope.noDecrementMinutes = function() {
    var decrementedSelected = addMinutes(selected, -minuteStep);
    return decrementedSelected < min ||
      (decrementedSelected > selected && decrementedSelected > max);
  };

  $scope.noToggleMeridian = function() {
    if (selected.getHours() < 13) {
      return addMinutes(selected, 12 * 60) > max;
    } else {
      return addMinutes(selected, -12 * 60) < min;
    }
  };

  // 12H / 24H mode
  $scope.showMeridian = timepickerConfig.showMeridian;
  if ($attrs.showMeridian) {
    $scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
      $scope.showMeridian = !!value;

      if (ngModelCtrl.$error.time) {
        // Evaluate from template
        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
        if (angular.isDefined(hours) && angular.isDefined(minutes)) {
          selected.setHours(hours);
          refresh();
        }
      } else {
        updateTemplate();
      }
    });
  }

  // Get $scope.hours in 24H mode if valid
  function getHoursFromTemplate() {
    var hours = parseInt($scope.hours, 10);
    var valid = $scope.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
    if (!valid) {
      return undefined;
    }

    if ($scope.showMeridian) {
      if (hours === 12) {
        hours = 0;
      }
      if ($scope.meridian === meridians[1]) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  function getMinutesFromTemplate() {
    var minutes = parseInt($scope.minutes, 10);
    return (minutes >= 0 && minutes < 60) ? minutes : undefined;
  }

  function pad(value) {
    return (angular.isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
  }

  // Respond on mousewheel spin
  this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl) {
    var isScrollingUp = function(e) {
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      //pick correct delta variable depending on event
      var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
      return (e.detail || delta > 0);
    };

    hoursInputEl.bind('mousewheel wheel', function(e) {
      $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
      e.preventDefault();
    });

    minutesInputEl.bind('mousewheel wheel', function(e) {
      $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
      e.preventDefault();
    });

  };

  // Respond on up/down arrowkeys
  this.setupArrowkeyEvents = function(hoursInputEl, minutesInputEl) {
    hoursInputEl.bind('keydown', function(e) {
      if (e.which === 38) { // up
        e.preventDefault();
        $scope.incrementHours();
        $scope.$apply();
      } else if (e.which === 40) { // down
        e.preventDefault();
        $scope.decrementHours();
        $scope.$apply();
      }
    });

    minutesInputEl.bind('keydown', function(e) {
      if (e.which === 38) { // up
        e.preventDefault();
        $scope.incrementMinutes();
        $scope.$apply();
      } else if (e.which === 40) { // down
        e.preventDefault();
        $scope.decrementMinutes();
        $scope.$apply();
      }
    });
  };

  this.setupInputEvents = function(hoursInputEl, minutesInputEl) {
    if ($scope.readonlyInput) {
      $scope.updateHours = angular.noop;
      $scope.updateMinutes = angular.noop;
      return;
    }

    var invalidate = function(invalidHours, invalidMinutes) {
      ngModelCtrl.$setViewValue(null);
      ngModelCtrl.$setValidity('time', false);
      if (angular.isDefined(invalidHours)) {
        $scope.invalidHours = invalidHours;
      }
      if (angular.isDefined(invalidMinutes)) {
        $scope.invalidMinutes = invalidMinutes;
      }
    };

    $scope.updateHours = function() {
      var hours = getHoursFromTemplate(),
        minutes = getMinutesFromTemplate();

      if (angular.isDefined(hours) && angular.isDefined(minutes)) {
        selected.setHours(hours);
        if (selected < min || selected > max) {
          invalidate(true);
        } else {
          refresh('h');
        }
      } else {
        invalidate(true);
      }
    };

    hoursInputEl.bind('blur', function(e) {
      if (!$scope.invalidHours && $scope.hours < 10) {
        $scope.$apply(function() {
          $scope.hours = pad($scope.hours);
        });
      }
    });

    $scope.updateMinutes = function() {
      var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(undefined, true);
        } else {
          refresh('m');
        }
      } else {
        invalidate(undefined, true);
      }
    };

    minutesInputEl.bind('blur', function(e) {
      if (!$scope.invalidMinutes && $scope.minutes < 10) {
        $scope.$apply(function() {
          $scope.minutes = pad($scope.minutes);
        });
      }
    });

  };

  this.render = function() {
    var date = ngModelCtrl.$viewValue;

    if (isNaN(date)) {
      ngModelCtrl.$setValidity('time', false);
      $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
    } else {
      if (date) {
        selected = date;
      }

      if (selected < min || selected > max) {
        ngModelCtrl.$setValidity('time', false);
        $scope.invalidHours = true;
        $scope.invalidMinutes = true;
      } else {
        makeValid();
      }
      updateTemplate();
    }
  };

  // Call internally when we know that model is valid.
  function refresh(keyboardChange) {
    makeValid();
    ngModelCtrl.$setViewValue(new Date(selected));
    updateTemplate(keyboardChange);
  }

  function makeValid() {
    ngModelCtrl.$setValidity('time', true);
    $scope.invalidHours = false;
    $scope.invalidMinutes = false;
  }

  function updateTemplate(keyboardChange) {
    var hours = selected.getHours(), minutes = selected.getMinutes();

    if ($scope.showMeridian) {
      hours = (hours === 0 || hours === 12) ? 12 : hours % 12; // Convert 24 to 12 hour system
    }

    $scope.hours = keyboardChange === 'h' ? hours : pad(hours);
    if (keyboardChange !== 'm') {
      $scope.minutes = pad(minutes);
    }
    $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
  }

  function addMinutes(date, minutes) {
    var dt = new Date(date.getTime() + minutes * 60000);
    var newDate = new Date(date);
    newDate.setHours(dt.getHours(), dt.getMinutes());
    return newDate;
  }

  function addMinutesToSelected(minutes) {
    selected = addMinutes(selected, minutes);
    refresh();
  }

  $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
    $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;

  $scope.incrementHours = function() {
    if (!$scope.noIncrementHours()) {
      addMinutesToSelected(hourStep * 60);
    }
  };

  $scope.decrementHours = function() {
    if (!$scope.noDecrementHours()) {
      addMinutesToSelected(-hourStep * 60);
    }
  };

  $scope.incrementMinutes = function() {
    if (!$scope.noIncrementMinutes()) {
      addMinutesToSelected(minuteStep);
    }
  };

  $scope.decrementMinutes = function() {
    if (!$scope.noDecrementMinutes()) {
      addMinutesToSelected(-minuteStep);
    }
  };

  $scope.toggleMeridian = function() {
    if (!$scope.noToggleMeridian()) {
      addMinutesToSelected(12 * 60 * (selected.getHours() < 12 ? 1 : -1));
    }
  };
}])

.directive('uibTimepicker', function() {
  return {
    restrict: 'EA',
    require: ['uibTimepicker', '?^ngModel'],
    controller: 'UibTimepickerController',
    controllerAs: 'timepicker',
    replace: true,
    scope: {},
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/timepicker/timepicker.html';
    },
    link: function(scope, element, attrs, ctrls) {
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (ngModelCtrl) {
        timepickerCtrl.init(ngModelCtrl, element.find('input'));
      }
    }
  };
});

/* Deprecated timepicker below */

angular.module('ui.bootstrap.timepicker')

.value('$timepickerSuppressWarning', false)

.controller('TimepickerController', ['$scope', '$element', '$attrs', '$controller', '$log', '$timepickerSuppressWarning', function($scope, $element, $attrs, $controller, $log, $timepickerSuppressWarning) {
  if (!$timepickerSuppressWarning) {
    $log.warn('TimepickerController is now deprecated. Use UibTimepickerController instead.');
  }

  angular.extend(this, $controller('UibTimepickerController', {
    $scope: $scope,
    $element: $element,
    $attrs: $attrs
  }));
}])

.directive('timepicker', ['$log', '$timepickerSuppressWarning', function($log, $timepickerSuppressWarning) {
  return {
    restrict: 'EA',
    require: ['timepicker', '?^ngModel'],
    controller: 'TimepickerController',
    controllerAs: 'timepicker',
    replace: true,
    scope: {},
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/timepicker/timepicker.html';
    },
    link: function(scope, element, attrs, ctrls) {
      if (!$timepickerSuppressWarning) {
        $log.warn('timepicker is now deprecated. Use uib-timepicker instead.');
      }
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (ngModelCtrl) {
        timepickerCtrl.init(ngModelCtrl, element.find('input'));
      }
    }
  };
}]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('uibTypeaheadParser', ['$parse', function($parse) {
    //                      00000111000000000000022200000000000000003333333333333330000000000044000
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
      parse: function(input) {
        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match) {
          throw new Error(
            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
              ' but got "' + input + '".');
        }

        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }])

  .controller('UibTypeaheadController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$uibPosition', 'uibTypeaheadParser',
    function(originalScope, element, attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, $position, typeaheadParser) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    var eventDebounceTime = 200;
    var modelCtrl, ngModelOptions;
    //SUPPORTED ATTRIBUTES (OPTIONS)

    //minimal no of characters that needs to be entered before typeahead kicks-in
    var minLength = originalScope.$eval(attrs.typeaheadMinLength);
    if (!minLength && minLength !== 0) {
      minLength = 1;
    }

    //minimal wait time after last character typed before typeahead kicks-in
    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

    //should it restrict model values to the ones selected from the popup only?
    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

    //binding to a variable that indicates if matches are being retrieved asynchronously
    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

    //a callback executed when a match is selected
    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

    //should it select highlighted popup value when losing focus?
    var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

    //binding to a variable that indicates if there were no results after the query is completed
    var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

    var appendToBody =  attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

    var appendToElementId =  attrs.typeaheadAppendToElementId || false;

    var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

    //If input matches an item of the list exactly, select it automatically
    var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

    //INTERNAL VARIABLES

    //model setter executed upon match selection
    var parsedModel = $parse(attrs.ngModel);
    var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
    var $setModelValue = function(scope, newValue) {
      if (angular.isFunction(parsedModel(originalScope)) &&
        ngModelOptions && ngModelOptions.$options && ngModelOptions.$options.getterSetter) {
        return invokeModelSetter(scope, {$$$p: newValue});
      } else {
        return parsedModel.assign(scope, newValue);
      }
    };

    //expressions used by typeahead
    var parserResult = typeaheadParser.parse(attrs.uibTypeahead);

    var hasFocus;

    //Used to avoid bug in iOS webview where iOS keyboard does not fire
    //mousedown & mouseup events
    //Issue #3699
    var selected;

    //create a child scope for the typeahead directive so we are not polluting original scope
    //with typeahead-specific data (matches, query etc.)
    var scope = originalScope.$new();
    var offDestroy = originalScope.$on('$destroy', function() {
      scope.$destroy();
    });
    scope.$on('$destroy', offDestroy);

    // WAI-ARIA
    var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
    element.attr({
      'aria-autocomplete': 'list',
      'aria-expanded': false,
      'aria-owns': popupId
    });

    //pop-up element used to display matches
    var popUpEl = angular.element('<div uib-typeahead-popup></div>');
    popUpEl.attr({
      id: popupId,
      matches: 'matches',
      active: 'activeIdx',
      select: 'select(activeIdx)',
      'move-in-progress': 'moveInProgress',
      query: 'query',
      position: 'position'
    });
    //custom item template
    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
      popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
    }

    if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
      popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
    }

    var resetMatches = function() {
      scope.matches = [];
      scope.activeIdx = -1;
      element.attr('aria-expanded', false);
    };

    var getMatchId = function(index) {
      return popupId + '-option-' + index;
    };

    // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
    // This attribute is added or removed automatically when the `activeIdx` changes.
    scope.$watch('activeIdx', function(index) {
      if (index < 0) {
        element.removeAttr('aria-activedescendant');
      } else {
        element.attr('aria-activedescendant', getMatchId(index));
      }
    });

    var inputIsExactMatch = function(inputValue, index) {
      if (scope.matches.length > index && inputValue) {
        return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
      }

      return false;
    };

    var getMatchesAsync = function(inputValue) {
      var locals = {$viewValue: inputValue};
      isLoadingSetter(originalScope, true);
      isNoResultsSetter(originalScope, false);
      $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
        //it might happen that several async queries were in progress if a user were typing fast
        //but we are interested only in responses that correspond to the current view value
        var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
        if (onCurrentRequest && hasFocus) {
          if (matches && matches.length > 0) {
            scope.activeIdx = focusFirst ? 0 : -1;
            isNoResultsSetter(originalScope, false);
            scope.matches.length = 0;

            //transform labels
            for (var i = 0; i < matches.length; i++) {
              locals[parserResult.itemName] = matches[i];
              scope.matches.push({
                id: getMatchId(i),
                label: parserResult.viewMapper(scope, locals),
                model: matches[i]
              });
            }

            scope.query = inputValue;
            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
            //due to other elements being rendered
            recalculatePosition();

            element.attr('aria-expanded', true);

            //Select the single remaining option if user input matches
            if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
              scope.select(0);
            }
          } else {
            resetMatches();
            isNoResultsSetter(originalScope, true);
          }
        }
        if (onCurrentRequest) {
          isLoadingSetter(originalScope, false);
        }
      }, function() {
        resetMatches();
        isLoadingSetter(originalScope, false);
        isNoResultsSetter(originalScope, true);
      });
    };

    // bind events only if appendToBody params exist - performance feature
    if (appendToBody) {
      angular.element($window).bind('resize', fireRecalculating);
      $document.find('body').bind('scroll', fireRecalculating);
    }

    // Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
    var timeoutEventPromise;

    // Default progress type
    scope.moveInProgress = false;

    function fireRecalculating() {
      if (!scope.moveInProgress) {
        scope.moveInProgress = true;
        scope.$digest();
      }

      // Cancel previous timeout
      if (timeoutEventPromise) {
        $timeout.cancel(timeoutEventPromise);
      }

      // Debounced executing recalculate after events fired
      timeoutEventPromise = $timeout(function() {
        // if popup is visible
        if (scope.matches.length) {
          recalculatePosition();
        }

        scope.moveInProgress = false;
      }, eventDebounceTime);
    }

    // recalculate actual position and set new values to scope
    // after digest loop is popup in right position
    function recalculatePosition() {
      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      scope.position.top += element.prop('offsetHeight');
    }

    //we need to propagate user's query so we can higlight matches
    scope.query = undefined;

    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
    var timeoutPromise;

    var scheduleSearchWithTimeout = function(inputValue) {
      timeoutPromise = $timeout(function() {
        getMatchesAsync(inputValue);
      }, waitTime);
    };

    var cancelPreviousTimeout = function() {
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }
    };

    resetMatches();

    scope.select = function(activeIdx) {
      //called from within the $digest() cycle
      var locals = {};
      var model, item;

      selected = true;
      locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
      model = parserResult.modelMapper(originalScope, locals);
      $setModelValue(originalScope, model);
      modelCtrl.$setValidity('editable', true);
      modelCtrl.$setValidity('parse', true);

      onSelectCallback(originalScope, {
        $item: item,
        $model: model,
        $label: parserResult.viewMapper(originalScope, locals)
      });

      resetMatches();

      //return focus to the input element if a match was selected via a mouse click event
      // use timeout to avoid $rootScope:inprog error
      if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
        $timeout(function() { element[0].focus(); }, 0, false);
      }
    };

    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
    element.bind('keydown', function(evt) {
      //typeahead is open and an "interesting" key was pressed
      if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
        return;
      }

      // if there's nothing selected (i.e. focusFirst) and enter or tab is hit, clear the results
      if (scope.activeIdx === -1 && (evt.which === 9 || evt.which === 13)) {
        resetMatches();
        scope.$digest();
        return;
      }

      evt.preventDefault();

      if (evt.which === 40) {
        scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
        scope.$digest();
      } else if (evt.which === 38) {
        scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
        scope.$digest();
      } else if (evt.which === 13 || evt.which === 9) {
        scope.$apply(function () {
          scope.select(scope.activeIdx);
        });
      } else if (evt.which === 27) {
        evt.stopPropagation();

        resetMatches();
        scope.$digest();
      }
    });

    element.bind('blur', function() {
      if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
        selected = true;
        scope.$apply(function() {
          scope.select(scope.activeIdx);
        });
      }
      hasFocus = false;
      selected = false;
    });

    // Keep reference to click handler to unbind it.
    var dismissClickHandler = function(evt) {
      // Issue #3973
      // Firefox treats right click as a click on document
      if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
        resetMatches();
        if (!$rootScope.$$phase) {
          scope.$digest();
        }
      }
    };

    $document.bind('click', dismissClickHandler);

    originalScope.$on('$destroy', function() {
      $document.unbind('click', dismissClickHandler);
      if (appendToBody || appendToElementId) {
        $popup.remove();
      }

      if (appendToBody) {
        angular.element($window).unbind('resize', fireRecalculating);
        $document.find('body').unbind('scroll', fireRecalculating);
      }
      // Prevent jQuery cache memory leak
      popUpEl.remove();
    });

    var $popup = $compile(popUpEl)(scope);

    if (appendToBody) {
      $document.find('body').append($popup);
    } else if (appendToElementId !== false) {
      angular.element($document[0].getElementById(appendToElementId)).append($popup);
    } else {
      element.after($popup);
    }

    this.init = function(_modelCtrl, _ngModelOptions) {
      modelCtrl = _modelCtrl;
      ngModelOptions = _ngModelOptions;

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function(inputValue) {
        hasFocus = true;

        if (minLength === 0 || inputValue && inputValue.length >= minLength) {
          if (waitTime > 0) {
            cancelPreviousTimeout();
            scheduleSearchWithTimeout(inputValue);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          cancelPreviousTimeout();
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        } else {
          if (!inputValue) {
            // Reset in case user had typed something previously.
            modelCtrl.$setValidity('editable', true);
            return null;
          } else {
            modelCtrl.$setValidity('editable', false);
            return undefined;
          }
        }
      });

      modelCtrl.$formatters.push(function(modelValue) {
        var candidateViewValue, emptyViewValue;
        var locals = {};

        // The validity may be set to false via $parsers (see above) if
        // the model is restricted to selected values. If the model
        // is set manually it is considered to be valid.
        if (!isEditable) {
          modelCtrl.$setValidity('editable', true);
        }

        if (inputFormatter) {
          locals.$model = modelValue;
          return inputFormatter(originalScope, locals);
        } else {
          //it might happen that we don't have enough info to properly render input value
          //we need to check for this situation and simply return model value if we can't apply custom formatting
          locals[parserResult.itemName] = modelValue;
          candidateViewValue = parserResult.viewMapper(originalScope, locals);
          locals[parserResult.itemName] = undefined;
          emptyViewValue = parserResult.viewMapper(originalScope, locals);

          return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
        }
      });
    };
  }])

  .directive('uibTypeahead', function() {
    return {
      controller: 'UibTypeaheadController',
      require: ['ngModel', '^?ngModelOptions', 'uibTypeahead'],
      link: function(originalScope, element, attrs, ctrls) {
        ctrls[2].init(ctrls[0], ctrls[1]);
      }
    };
  })

  .directive('uibTypeaheadPopup', function() {
    return {
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '&',
        moveInProgress: '=',
        select: '&'
      },
      replace: true,
      templateUrl: function(element, attrs) {
        return attrs.popupTemplateUrl || 'template/typeahead/typeahead-popup.html';
      },
      link: function(scope, element, attrs) {
        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function() {
          return scope.matches.length > 0;
        };

        scope.isActive = function(matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function(activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  })

  .directive('uibTypeaheadMatch', ['$templateRequest', '$compile', '$parse', function($templateRequest, $compile, $parse) {
    return {
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link:function(scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $templateRequest(tplUrl).then(function(tplContent) {
          $compile(tplContent.trim())(scope, function(clonedElement) {
            element.replaceWith(clonedElement);
          });
        });
      }
    };
  }])

  .filter('uibTypeaheadHighlight', ['$sce', '$injector', '$log', function($sce, $injector, $log) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function(matchItem, query) {
      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }
      matchItem = query? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }
      return matchItem;
    };
  }]);

/* Deprecated typeahead below */
  
angular.module('ui.bootstrap.typeahead')
  .value('$typeaheadSuppressWarning', false)
  .service('typeaheadParser', ['$parse', 'uibTypeaheadParser', '$log', '$typeaheadSuppressWarning', function($parse, uibTypeaheadParser, $log, $typeaheadSuppressWarning) {
    if (!$typeaheadSuppressWarning) {
      $log.warn('typeaheadParser is now deprecated. Use uibTypeaheadParser instead.');
    }

    return uibTypeaheadParser;
  }])

  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$uibPosition', 'typeaheadParser', '$log', '$typeaheadSuppressWarning',
    function($compile, $parse, $q, $timeout, $document, $window, $rootScope, $position, typeaheadParser, $log, $typeaheadSuppressWarning) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    var eventDebounceTime = 200;
    return {
      require: ['ngModel', '^?ngModelOptions'],
      link: function(originalScope, element, attrs, ctrls) {
        if (!$typeaheadSuppressWarning) {
          $log.warn('typeahead is now deprecated. Use uib-typeahead instead.');
        }
        var modelCtrl = ctrls[0];
        var ngModelOptions = ctrls[1];
        //SUPPORTED ATTRIBUTES (OPTIONS)

        //minimal no of characters that needs to be entered before typeahead kicks-in
        var minLength = originalScope.$eval(attrs.typeaheadMinLength);
        if (!minLength && minLength !== 0) {
          minLength = 1;
        }

        //minimal wait time after last character typed before typeahead kicks-in
        var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

        //should it restrict model values to the ones selected from the popup only?
        var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

        //binding to a variable that indicates if matches are being retrieved asynchronously
        var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

        //a callback executed when a match is selected
        var onSelectCallback = $parse(attrs.typeaheadOnSelect);

        //should it select highlighted popup value when losing focus?
        var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

        //binding to a variable that indicates if there were no results after the query is completed
        var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

        var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

        var appendToBody =  attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

        var appendToElementId =  attrs.typeaheadAppendToElementId || false;

        var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

        //If input matches an item of the list exactly, select it automatically
        var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

        //INTERNAL VARIABLES

        //model setter executed upon match selection
        var parsedModel = $parse(attrs.ngModel);
        var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
        var $setModelValue = function(scope, newValue) {
          if (angular.isFunction(parsedModel(originalScope)) &&
            ngModelOptions && ngModelOptions.$options && ngModelOptions.$options.getterSetter) {
            return invokeModelSetter(scope, {$$$p: newValue});
          } else {
            return parsedModel.assign(scope, newValue);
          }
        };

        //expressions used by typeahead
        var parserResult = typeaheadParser.parse(attrs.typeahead);

        var hasFocus;

        //Used to avoid bug in iOS webview where iOS keyboard does not fire
        //mousedown & mouseup events
        //Issue #3699
        var selected;

        //create a child scope for the typeahead directive so we are not polluting original scope
        //with typeahead-specific data (matches, query etc.)
        var scope = originalScope.$new();
        var offDestroy = originalScope.$on('$destroy', function() {
			    scope.$destroy();
        });
        scope.$on('$destroy', offDestroy);

        // WAI-ARIA
        var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
        element.attr({
          'aria-autocomplete': 'list',
          'aria-expanded': false,
          'aria-owns': popupId
        });

        //pop-up element used to display matches
        var popUpEl = angular.element('<div typeahead-popup></div>');
        popUpEl.attr({
          id: popupId,
          matches: 'matches',
          active: 'activeIdx',
          select: 'select(activeIdx)',
          'move-in-progress': 'moveInProgress',
          query: 'query',
          position: 'position'
        });
        //custom item template
        if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
          popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
        }

        if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
          popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
        }

        var resetMatches = function() {
          scope.matches = [];
          scope.activeIdx = -1;
          element.attr('aria-expanded', false);
        };

        var getMatchId = function(index) {
          return popupId + '-option-' + index;
        };

        // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
        // This attribute is added or removed automatically when the `activeIdx` changes.
        scope.$watch('activeIdx', function(index) {
          if (index < 0) {
            element.removeAttr('aria-activedescendant');
          } else {
            element.attr('aria-activedescendant', getMatchId(index));
          }
        });

        var inputIsExactMatch = function(inputValue, index) {
          if (scope.matches.length > index && inputValue) {
            return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
          }

          return false;
        };

        var getMatchesAsync = function(inputValue) {
          var locals = {$viewValue: inputValue};
          isLoadingSetter(originalScope, true);
          isNoResultsSetter(originalScope, false);
          $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
            //it might happen that several async queries were in progress if a user were typing fast
            //but we are interested only in responses that correspond to the current view value
            var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
            if (onCurrentRequest && hasFocus) {
              if (matches && matches.length > 0) {
                scope.activeIdx = focusFirst ? 0 : -1;
                isNoResultsSetter(originalScope, false);
                scope.matches.length = 0;

                //transform labels
                for (var i = 0; i < matches.length; i++) {
                  locals[parserResult.itemName] = matches[i];
                  scope.matches.push({
                    id: getMatchId(i),
                    label: parserResult.viewMapper(scope, locals),
                    model: matches[i]
                  });
                }

                scope.query = inputValue;
                //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                //due to other elements being rendered
                recalculatePosition();

                element.attr('aria-expanded', true);

                //Select the single remaining option if user input matches
                if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
                  scope.select(0);
                }
              } else {
                resetMatches();
                isNoResultsSetter(originalScope, true);
              }
            }
            if (onCurrentRequest) {
              isLoadingSetter(originalScope, false);
            }
          }, function() {
            resetMatches();
            isLoadingSetter(originalScope, false);
            isNoResultsSetter(originalScope, true);
          });
        };

        // bind events only if appendToBody params exist - performance feature
        if (appendToBody) {
          angular.element($window).bind('resize', fireRecalculating);
          $document.find('body').bind('scroll', fireRecalculating);
        }

        // Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
        var timeoutEventPromise;

        // Default progress type
        scope.moveInProgress = false;

        function fireRecalculating() {
          if (!scope.moveInProgress) {
            scope.moveInProgress = true;
            scope.$digest();
          }

          // Cancel previous timeout
          if (timeoutEventPromise) {
            $timeout.cancel(timeoutEventPromise);
          }

          // Debounced executing recalculate after events fired
          timeoutEventPromise = $timeout(function() {
            // if popup is visible
            if (scope.matches.length) {
              recalculatePosition();
            }

            scope.moveInProgress = false;
          }, eventDebounceTime);
        }

        // recalculate actual position and set new values to scope
        // after digest loop is popup in right position
        function recalculatePosition() {
          scope.position = appendToBody ? $position.offset(element) : $position.position(element);
          scope.position.top += element.prop('offsetHeight');
        }

        resetMatches();

        //we need to propagate user's query so we can higlight matches
        scope.query = undefined;

        //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
        var timeoutPromise;

        var scheduleSearchWithTimeout = function(inputValue) {
          timeoutPromise = $timeout(function() {
            getMatchesAsync(inputValue);
          }, waitTime);
        };

        var cancelPreviousTimeout = function() {
          if (timeoutPromise) {
            $timeout.cancel(timeoutPromise);
          }
        };

        //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
        //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
        modelCtrl.$parsers.unshift(function(inputValue) {
          hasFocus = true;

          if (minLength === 0 || inputValue && inputValue.length >= minLength) {
            if (waitTime > 0) {
              cancelPreviousTimeout();
              scheduleSearchWithTimeout(inputValue);
            } else {
              getMatchesAsync(inputValue);
            }
          } else {
            isLoadingSetter(originalScope, false);
            cancelPreviousTimeout();
            resetMatches();
          }

          if (isEditable) {
            return inputValue;
          } else {
            if (!inputValue) {
              // Reset in case user had typed something previously.
              modelCtrl.$setValidity('editable', true);
              return null;
            } else {
              modelCtrl.$setValidity('editable', false);
              return undefined;
            }
          }
        });

        modelCtrl.$formatters.push(function(modelValue) {
          var candidateViewValue, emptyViewValue;
          var locals = {};

          // The validity may be set to false via $parsers (see above) if
          // the model is restricted to selected values. If the model
          // is set manually it is considered to be valid.
          if (!isEditable) {
            modelCtrl.$setValidity('editable', true);
          }

          if (inputFormatter) {
            locals.$model = modelValue;
            return inputFormatter(originalScope, locals);
          } else {
            //it might happen that we don't have enough info to properly render input value
            //we need to check for this situation and simply return model value if we can't apply custom formatting
            locals[parserResult.itemName] = modelValue;
            candidateViewValue = parserResult.viewMapper(originalScope, locals);
            locals[parserResult.itemName] = undefined;
            emptyViewValue = parserResult.viewMapper(originalScope, locals);

            return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
          }
        });

        scope.select = function(activeIdx) {
          //called from within the $digest() cycle
          var locals = {};
          var model, item;

          selected = true;
          locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
          model = parserResult.modelMapper(originalScope, locals);
          $setModelValue(originalScope, model);
          modelCtrl.$setValidity('editable', true);
          modelCtrl.$setValidity('parse', true);

          onSelectCallback(originalScope, {
            $item: item,
            $model: model,
            $label: parserResult.viewMapper(originalScope, locals)
          });

          resetMatches();

          //return focus to the input element if a match was selected via a mouse click event
          // use timeout to avoid $rootScope:inprog error
          if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
            $timeout(function() { element[0].focus(); }, 0, false);
          }
        };

        //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
        element.bind('keydown', function(evt) {
          //typeahead is open and an "interesting" key was pressed
          if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
            return;
          }

          // if there's nothing selected (i.e. focusFirst) and enter or tab is hit, clear the results
          if (scope.activeIdx === -1 && (evt.which === 9 || evt.which === 13)) {
            resetMatches();
            scope.$digest();
            return;
          }

          evt.preventDefault();

          if (evt.which === 40) {
            scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
            scope.$digest();
          } else if (evt.which === 38) {
            scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
            scope.$digest();
          } else if (evt.which === 13 || evt.which === 9) {
            scope.$apply(function () {
              scope.select(scope.activeIdx);
            });
          } else if (evt.which === 27) {
            evt.stopPropagation();

            resetMatches();
            scope.$digest();
          }
        });

        element.bind('blur', function() {
          if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
            selected = true;
            scope.$apply(function() {
              scope.select(scope.activeIdx);
            });
          }
          hasFocus = false;
          selected = false;
        });

        // Keep reference to click handler to unbind it.
        var dismissClickHandler = function(evt) {
          // Issue #3973
          // Firefox treats right click as a click on document
          if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
            resetMatches();
            if (!$rootScope.$$phase) {
              scope.$digest();
            }
          }
        };

        $document.bind('click', dismissClickHandler);

        originalScope.$on('$destroy', function() {
          $document.unbind('click', dismissClickHandler);
          if (appendToBody || appendToElementId) {
            $popup.remove();
          }

          if (appendToBody) {
            angular.element($window).unbind('resize', fireRecalculating);
            $document.find('body').unbind('scroll', fireRecalculating);
          }
          // Prevent jQuery cache memory leak
          popUpEl.remove();
        });

        var $popup = $compile(popUpEl)(scope);

        if (appendToBody) {
          $document.find('body').append($popup);
        } else if (appendToElementId !== false) {
          angular.element($document[0].getElementById(appendToElementId)).append($popup);
        } else {
          element.after($popup);
        }
      }
    };
  }])
  
  .directive('typeaheadPopup', ['$typeaheadSuppressWarning', '$log', function($typeaheadSuppressWarning, $log) {
    return {
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '&',
        moveInProgress: '=',
        select: '&'
      },
      replace: true,
      templateUrl: function(element, attrs) {
        return attrs.popupTemplateUrl || 'template/typeahead/typeahead-popup.html';
      },
      link: function(scope, element, attrs) {
        
        if (!$typeaheadSuppressWarning) {
          $log.warn('typeahead-popup is now deprecated. Use uib-typeahead-popup instead.');
        }
        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function() {
          return scope.matches.length > 0;
        };

        scope.isActive = function(matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function(activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  }])
  
  .directive('typeaheadMatch', ['$templateRequest', '$compile', '$parse', '$typeaheadSuppressWarning', '$log', function($templateRequest, $compile, $parse, $typeaheadSuppressWarning, $log) {
    return {
      restrict: 'EA',
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link:function(scope, element, attrs) {
        if (!$typeaheadSuppressWarning) {
          $log.warn('typeahead-match is now deprecated. Use uib-typeahead-match instead.');
        }

        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $templateRequest(tplUrl).then(function(tplContent) {
          $compile(tplContent.trim())(scope, function(clonedElement) {
            element.replaceWith(clonedElement);
          });
        });
      }
    };
  }])
  
  .filter('typeaheadHighlight', ['$sce', '$injector', '$log', '$typeaheadSuppressWarning', function($sce, $injector, $log, $typeaheadSuppressWarning) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function(matchItem, query) {
      if (!$typeaheadSuppressWarning) {
        $log.warn('typeaheadHighlight is now deprecated. Use uibTypeaheadHighlight instead.');
      }

      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }

      matchItem = query? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }

      return matchItem;
    };
  }]);

angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"panel {{panelClass || 'panel-default'}}\">\n" +
    "  <div class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a href tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "	  <div class=\"panel-body\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"panel-group\" ng-transclude></div>");
}]);

angular.module("template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/alert/alert.html",
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissible' : null]\" role=\"alert\">\n" +
    "    <button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "        <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/carousel.html",
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\">\n" +
    "  <div class=\"carousel-inner\" ng-transclude></div>\n" +
    "  <a role=\"button\" href class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\">\n" +
    "    <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "    <span class=\"sr-only\">previous</span>\n" +
    "  </a>\n" +
    "  <a role=\"button\" href class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\">\n" +
    "    <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "    <span class=\"sr-only\">next</span>\n" +
    "  </a>\n" +
    "  <ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
    "    <li ng-repeat=\"slide in slides | orderBy:indexOfSlide track by $index\" ng-class=\"{ active: isActive(slide) }\" ng-click=\"select(slide)\">\n" +
    "      <span class=\"sr-only\">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if=\"isActive(slide)\">, currently active</span></span>\n" +
    "    </li>\n" +
    "  </ol>\n" +
    "</div>");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/slide.html",
    "<div ng-class=\"{\n" +
    "    'active': active\n" +
    "  }\" class=\"item text-center\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\n" +
    "  <uib-daypicker ng-switch-when=\"day\" tabindex=\"0\"></uib-daypicker>\n" +
    "  <uib-monthpicker ng-switch-when=\"month\" tabindex=\"0\"></uib-monthpicker>\n" +
    "  <uib-yearpicker ng-switch-when=\"year\" tabindex=\"0\"></uib-yearpicker>\n" +
    "</div>");
}]);

angular.module("template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\n" +
    "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-muted': dt.secondary, 'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/month.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" dropdown-nested ng-if=\"isOpen\" style=\"display: block\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "		<span class=\"btn-group pull-left\">\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "		</span>\n" +
    "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/year.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div uib-modal-animation-class=\"fade\"\n" +
    "     modal-in-class=\"in\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\"\n" +
    "    uib-modal-animation-class=\"fade\"\n" +
    "    modal-in-class=\"in\"\n" +
    "    ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pager.html",
    "<ul class=\"pager\">\n" +
    "  <li ng-class=\"{disabled: noPrevious()||ngDisabled, previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\">{{::getText('previous')}}</a></li>\n" +
    "  <li ng-class=\"{disabled: noNext()||ngDisabled, next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\">{{::getText('next')}}</a></li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pagination.html",
    "<ul class=\"pagination\">\n" +
    "  <li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-first\"><a href ng-click=\"selectPage(1, $event)\">{{::getText('first')}}</a></li>\n" +
    "  <li ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-prev\"><a href ng-click=\"selectPage(page - 1, $event)\">{{::getText('previous')}}</a></li>\n" +
    "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\" class=\"pagination-page\"><a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a></li>\n" +
    "  <li ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-next\"><a href ng-click=\"selectPage(page + 1, $event)\">{{::getText('next')}}</a></li>\n" +
    "  <li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-last\"><a href ng-click=\"selectPage(totalPages, $event)\">{{::getText('last')}}</a></li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-popup.html",
    "<div\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind-html=\"contentExp()\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-template-popup.html",
    "<div\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\"\n" +
    "    uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "    tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover-html.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover-html.html",
    "<div tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind-html=\"contentExp()\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover-template.html",
    "<div tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
    "      <div class=\"popover-content\"\n" +
    "        uib-tooltip-template-transclude=\"contentExp()\"\n" +
    "        tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div tooltip-animation-class=\"fade\"\n" +
    "  uib-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/bar.html",
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" style=\"min-width: 0;\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progress.html",
    "<div class=\"progress\" ng-transclude aria-labelledby=\"{{::title}}\"></div>");
}]);

angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" style=\"min-width: 0;\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
    "    <span ng-repeat-start=\"r in range track by $index\" class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
    "    <i ng-repeat-end ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < value && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\" ng-attr-title=\"{{r.title}}\" aria-valuetext=\"{{r.title}}\"></i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a href ng-click=\"select()\" uib-tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div>\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\" \n" +
    "         ng-repeat=\"tab in tabs\" \n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         uib-tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timepicker/timepicker.html",
    "<table>\n" +
    "  <tbody>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td><a ng-click=\"incrementHours()\" ng-class=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementHours()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td><a ng-click=\"incrementMinutes()\" ng-class=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementMinutes()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <td class=\"form-group\" ng-class=\"{'has-error': invalidHours}\">\n" +
    "        <input style=\"width:50px;\" type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\">\n" +
    "      </td>\n" +
    "      <td>:</td>\n" +
    "      <td class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
    "        <input style=\"width:50px;\" type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\">\n" +
    "      </td>\n" +
    "      <td ng-show=\"showMeridian\"><button type=\"button\" ng-class=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\" ng-disabled=\"noToggleMeridian()\" tabindex=\"{{::tabindex}}\">{{meridian}}</button></td>\n" +
    "    </tr>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td><a ng-click=\"decrementHours()\" ng-class=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementHours()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td><a ng-click=\"decrementMinutes()\" ng-class=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementMinutes()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-match.html",
    "<a href tabindex=\"-1\" ng-bind-html=\"match.label | uibTypeaheadHighlight:query\"></a>\n" +
    "");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-popup.html",
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{top: position().top+'px', left: position().left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{::match.id}}\">\n" +
    "        <div uib-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>');if(typeof module!=='undefined')module.exports='ui.bootstrap';
},{}],2:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Bulk require
// by dnp_theme
// Require/npm/Bower by Ingwie Phoenix

/**
    @file This file bulk-requires all the native components and
          gives it back as the exports.

          Due to the NodeJS-y environment, each entry is a factory
          function. Once called, it expects a global `window` and
          `document` object to be present.

          I.e.:
          ```javascript
          global.window = require("web-like-environment");
          global.document = window.document;
          // Now, window and document are available.
          var modal = require("bootstrap.native").modal();
          ```
*/

// Collection of all the bootstrap.native modules.
var bsn = {
    affix:      require("./lib/affix-native"),
    alert:      require("./lib/alert-native"),
    button:     require("./lib/button-native"),
    carousel:   require("./lib/carousel-native"),
    collapse:   require("./lib/collapse-native"),
    dropdown:   require("./lib/dropdown-native"),
    modal:      require("./lib/modal-native"),
    popover:    require("./lib/popover-native"),
    scrollspy:  require("./lib/scrollspy-native"),
    tab:        require("./lib/tab-native"),
    tooltip:    require("./lib/tooltip-native")
};

/**
 * Turn the first character into an uppercase character.
 * 
 * @param {String} str      Input string
 * @returns {String}        String with uppercase starting letter.
 */
function ucfirst(str) {
    var cap = str.charAt(0).toUpperCase();
    return cap+str.substr(1);
}

/**
 * This self-executing function takes all the key names from the Bootstrap Native modules
 * and assigns the original and uppercased key.
 * 
 * This allows scripts used to the Uppercase module names to function with CommonJS.
 * 
 * @fixes #33
 * @returns Object
 */
module.exports = (function BSNExporter(){
    var _exports = {};
    for(var component in bsn) {
        var key1 = component;
        var key2 = ucfirst(component);
        _exports[key1] = _exports[key2] = bsn[component];
    }
    return _exports;
})();

},{"./lib/affix-native":3,"./lib/alert-native":4,"./lib/button-native":5,"./lib/carousel-native":6,"./lib/collapse-native":7,"./lib/dropdown-native":8,"./lib/modal-native":9,"./lib/popover-native":10,"./lib/scrollspy-native":11,"./lib/tab-native":12,"./lib/tooltip-native":13}],3:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Affix
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Affix = factory();
	}

})(function(){

	//AFFIX DEFINITION
	var Affix = function(element,options) {
		options = options || {};
		
		this.element = typeof element === 'object' ? element : document.querySelector(element);
		this.options = {};
		this.options.target = options.target ? ((typeof(options.target) === 'object') ? options.target : document.querySelector(options.target)) : null; // target is an object
		this.options.offsetTop = options.offsetTop && options.offsetTop ? ( options.offsetTop === 'function' ? options.offsetTop() : parseInt(options.offsetTop,0) ) : 0; // offset option is an integer number or function to determine that number
		this.options.offsetBottom = options.offsetBottom && options.offsetBottom ? ( options.offsetBottom === 'function' ? options.offsetBottom() : parseInt(options.offsetBottom,0) ) : null;

		if (this.element && (this.options.target || this.options.offsetTop || this.options.offsetBottom ) ) { this.init(); }
	}

	//AFFIX METHODS
	Affix.prototype = {
		init: function () {
			this.affixed = false;
			this.affixedBottom = false;
			this.getPinOffsetTop = 0;
			this.getPinOffsetBottom = null;

			//actions
			this.checkPosition();
			this.updateAffix();
			this.scrollEvent();
			this.resizeEvent()
		},
		processOffsetTop: function () {
			if ( this.options.target !== null ) {
				return this.targetRect().top + this.scrollOffset();
			} else if ( this.options.offsetTop !== null ) {
				return this.options.offsetTop
			}
		},
		processOffsetBottom: function () {
			if ( this.options.offsetBottom !== null ) {
				var maxScroll = this.getMaxScroll();
				return maxScroll - this.elementHeight() - this.options.offsetBottom
			}
		},
		offsetTop: function () {
			return this.processOffsetTop()
		},
		offsetBottom: function () {
			return this.processOffsetBottom()
		},
		checkPosition: function () {
			this.getPinOffsetTop = this.offsetTop
			this.getPinOffsetBottom = this.offsetBottom
		},
		scrollOffset: function () {
			return window.pageYOffset || document.documentElement.scrollTop
		},
		pinTop: function () {
			if ( !/affix/.test(this.element.className) ) {
				this.element.className += ' affix';
				this.affixed = true
			}
		},
		unPinTop: function () {
			if ( /affix/.test(this.element.className) ) {
				this.element.className = this.element.className.replace(' affix','');
				this.affixed = false
			}
		},
		pinBottom: function () {
			if ( !/'affix-bottom'/.test(this.element.className) ) {
				this.element.className += ' affix-bottom';
				this.affixedBottom = true
			}
		},
		unPinBottom: function () {
			if ( /'affix-bottom'/.test(this.element.className) ) { 
				this.element.className = this.element.className.replace(' affix-bottom','');
				this.affixedBottom = false
			}
		},
		updatePin: function () {
			if (this.affixed === false && (parseInt(this.offsetTop(),0) - parseInt(this.scrollOffset(),0) < 0)) {
				this.pinTop();
			} else if (this.affixed === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinOffsetTop(),0) )) {
				this.unPinTop()
			}

			if (this.affixedBottom === false && (parseInt(this.offsetBottom(),0) - parseInt(this.scrollOffset(),0) < 0)) {
				this.pinBottom();
			} else if (this.affixedBottom === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinOffsetBottom(),0) )) {
				this.unPinBottom()
			}
		},

		updateAffix : function () { // Unpin and check position again
			this.unPinTop();
			this.unPinBottom();
			this.checkPosition()

			this.updatePin() // If any case update values again
		},

		elementHeight : function(){
			return this.element.offsetHeight
		},

		targetRect : function(){
			return this.options.target.getBoundingClientRect()
		},

		getMaxScroll : function(){
			return Math.max( document.body.scrollHeight, document.body.offsetHeight, 
				document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
		},

		scrollEvent : function(){
			var self = this;
			window.addEventListener('scroll', function() {
				self.updatePin()
			}, false);

		},
		resizeEvent : function(){
			var self = this, 
				isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false, 
				dl = (isIE && isIE < 10) ? 500 : 50;
			window.addEventListener('resize', function () {
				setTimeout(function(){
					self.updateAffix()
				},dl);
			}, false);

		}
	};

	// AFFIX DATA API
	// =================
	var Affixes = document.querySelectorAll('[data-spy="affix"]'), i = 0, afl = Affixes.length;
	for (i;i<afl;i++) {
		var item = Affixes[i], options = {};
			options.offsetTop		= item.getAttribute('data-offset-top');
			options.offsetBottom	= item.getAttribute('data-offset-bottom');
			options.target			= item.getAttribute('data-target');

		if ( item && (options.offsetTop !== null || options.offsetBottom !== null || options.target !== null) ) { //don't do anything unless we have something valid to pin
			new Affix(item, options);
		}
	}

	return Affix;
});

},{}],4:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Alert
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Alert = factory();
	}

})(function(root){

	// ALERT DEFINITION
	// ===================
	var Alert = function( element ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.alert = null;
		this.duration = 150; // default alert transition duration
		this.init();
	}

	// ALERT METHODS
	// ================
	Alert.prototype = {

		init : function() {
			this.actions();
			document.addEventListener('click', this.close, false); //delegate to all alerts, including those inserted later into the DOM
		},

		actions : function() {
			var self = this;

			this.close = function(e) {
				var target = e.target;
				self.btn = target.getAttribute('data-dismiss') === 'alert' && target.className === 'close' ? target : target.parentNode;
				self.alert = self.btn.parentNode;

				if ( self.alert !== null && self.btn.getAttribute('data-dismiss') === 'alert' && /in/.test(self.alert.className) ) {
					self.alert.className = self.alert.className.replace(' in','');
					setTimeout(function() {
						self.alert && self.alert.parentNode.removeChild(self.alert);
					}, self.duration);
				}

			}
		}
    }

	// ALERT DATA API
	// =================
    var Alerts = document.querySelectorAll('[data-dismiss="alert"]'), i = 0, all = Alerts.length;
	for (i;i<all;i++) {
		new Alert(Alerts[i]);
	}

	return Alert;

});

},{}],5:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Button
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Button = factory();
	}

})(function(){

	// BUTTON DEFINITION
	// ===================
	var Button = function( element, option ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.option = typeof option === 'string' ? option : null;

		this.init();
	};

	// BUTTON METHODS
	// ================
	Button.prototype = {

		init : function() {
			var self = this;
			this.actions();

			if ( /btn/.test(this.btn.className) ) {
				if ( this.option && this.option !== 'reset' ) {

					this.state = this.btn.getAttribute('data-'+this.option+'-text') || null;

					!this.btn.getAttribute('data-original-text') && this.btn.setAttribute('data-original-text',self.btn.innerHTML.replace(/^\s+|\s+$/g, ''));
					this.setState();

				} else if ( this.option === 'reset' ) {
					this.reset();
				}
			}

			if ( /btn-group/.test(this.btn.className) ) {
				this.btn.addEventListener('click', this.toggle, false);
			}
		},

		actions : function() {
			var self = this,
				changeEvent = (('CustomEvent' in window) && window.dispatchEvent) 
					? new CustomEvent('bs.button.change') : null; // The custom event that will be triggered on demand

			// assign event to a trigger function
			function triggerChange(t) { if (changeEvent) { t.dispatchEvent(changeEvent); } }

			this.setState = function() {
				if ( this.option === 'loading' ) {
					this.addClass(this.btn,'disabled');					
					this.btn.setAttribute('disabled','disabled');
				}
				this.btn.innerHTML = this.state;
			},

			this.reset = function() {
				if ( /disabled/.test(self.btn.className) || self.btn.getAttribute('disabled') === 'disabled' ) {
					this.removeClass(this.btn,'disabled');	
					self.btn.removeAttribute('disabled');
				}
				self.btn.innerHTML = self.btn.getAttribute('data-original-text');
			},

			this.toggle = function(e) {
				var parent = e.target.parentNode,
					label = e.target.tagName === 'LABEL' ? e.target : parent.tagName === 'LABEL' ? parent : null; // the .btn label
				
				if ( !label ) return; //react if a label or its immediate child is clicked
				
				var target = this, //e.currentTarget || e.srcElement; // the button group, the target of the handler function
					labels = target.querySelectorAll('.btn'), ll = labels.length, i = 0, // all the button group buttons
					input = label.getElementsByTagName('INPUT')[0];
					
				if ( !input ) return; //return if no input found

				//manage the dom manipulation
				if ( input.type === 'checkbox' ) { //checkboxes					
					if ( !input.checked ) {
						self.addClass(label,'active');
						input.getAttribute('checked');					
						input.setAttribute('checked','checked');
						input.checked = true;
					} else {
						self.removeClass(label,'active');
						input.getAttribute('checked');						
						input.removeAttribute('checked');
						input.checked = false;
					}
					triggerChange(input); //trigger the change for the input
					triggerChange(self.btn); //trigger the change for the btn-group
				}

				if ( input.type === 'radio' ) { // radio buttons
					if ( !input.checked ) { // don't trigger if already active
						self.addClass(label,'active');
						input.setAttribute('checked','checked');
						input.checked = true;
						triggerChange(self.btn); 		
						triggerChange(input); //trigger the change
						
						for (i;i<ll;i++) {
							var l = labels[i];
							if ( l !== label && /active/.test(l.className) )  {
								var inp = l.getElementsByTagName('INPUT')[0];
								self.removeClass(l,'active');
								inp.removeAttribute('checked');
								inp.checked = false;
								triggerChange(inp); // trigger the change								
							}				
						}
					}								
				}
			},
			this.addClass = function(el,c) { // where modern browsers fail, use classList	
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; el.offsetWidth; }
			},
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); el.offsetWidth; }
			}
		}
    }

	// BUTTON DATA API
	// =================
    var Buttons = document.querySelectorAll('[data-toggle=button]'), i = 0, btl = Buttons.length;
	for (i;i<btl;i++) {
		new Button(Buttons[i]);
	}
	
    var ButtonGroups = document.querySelectorAll('[data-toggle=buttons]'), j = 0, bgl = ButtonGroups.length;
	for (j;j<bgl;j++) {
		new Button(ButtonGroups[j]);
	}

	return Button;

});

},{}],6:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Carousel
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Carousel = factory();
	}

})(function(){

	// CAROUSEL DEFINITION
	// ===================
	var Carousel = function( element, options ) {
		options = options || {};

		this.carousel = (typeof element === 'object') ? element : document.querySelector( element );
		this.options = {}; //replace extend
		this.options.keyboard = options.keyboard === 'true' ? true : false;
		this.options.pause = options.pause ? options.pause : 'hover'; // false / hover

		// bootstrap carousel default transition duration / option
		this.duration = 600;
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);

		var items = this.carousel.querySelectorAll('.item'), il=items.length; //this is an object
		this.controls = this.carousel.querySelectorAll('.carousel-control');
		this.prev = this.controls[0];
		this.next = this.controls[1];
		this.slides = []; for (var i = 0; i < il; i++) { this.slides.push(items[i]); } // this is an array
		this.indicator = this.carousel.querySelector( ".carousel-indicators" ); // object
		this.indicators = this.carousel.querySelectorAll( ".carousel-indicators li" ); // object
		this.total		= this.slides.length;
		this.timer		= null;
		this.direction	= null;
		this.index		= 0;

		if (options.interval === 'false' ) {
			this.options.interval = false;
		} else {
			this.options.interval = parseInt(options.interval) || 5000;
		}

		this.init();
	};

	// CAROUSEL METHODS
	// ================
	Carousel.prototype = {
		init: function() {
			if ( this.options.interval !== false ){
				this.cycle();
			}

			if ( this.options && this.options.pause === 'hover' && this.options.interval !== false ) {
				this.pause();
			}
			this.actions();
			this._addEventListeners();
		},
		cycle: function(e) {
			var self = this;

			self.direction = 'left';
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index, e );

			}, self.options.interval);
		},
		pause: function() {
			var self = this;
			var pauseHandler = function () {
				if ( self.options.interval !==false && !/paused/.test(self.carousel.className) ) {
					self.carousel.className += ' paused';
					clearInterval( self.timer );
					self.timer = null;
				}
			};
			var resumeHandler = function() {
				if ( self.options.interval !==false && /paused/.test(self.carousel.className) ) {
					self.cycle();
					self.carousel.className = self.carousel.className.replace(' paused','');
				}
			};
			self.carousel.addEventListener( "mouseenter", pauseHandler, false);
			self.carousel.addEventListener( "mouseleave", resumeHandler, false);
			self.carousel.addEventListener( "touchstart", pauseHandler, false);
			self.carousel.addEventListener( "touchend", resumeHandler, false);
		},
		_slideTo: function( next, e ) {
			var self = this;
			var active = self._getActiveIndex(); // the current active
			//determine type
			var direction = self.direction;
			var dr = direction === 'left' ? 'next' : 'prev';
			var slid = null, slide=null;
			
			//register events
			if (('CustomEvent' in window) && window.dispatchEvent) {
				slid =  new CustomEvent("slid.bs.carousel");
				slide = new CustomEvent("slide.bs.carousel");
			}
			if (slid) { self.carousel.dispatchEvent(slid); } //here we go with the slid

			self._removeEventListeners();
			clearInterval(self.timer);
			self.timer = null;
			self._curentPage( self.indicators[next] );

			if ( /slide/.test(this.carousel.className) && !(this.isIE && this.isIE < 10) ) {
				self.slides[next].className += (' '+dr);
				self.slides[next].offsetWidth;
				self.slides[next].className += (' '+direction);
				self.slides[active].className += (' '+direction);

				setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
					self._addEventListeners();

					self.slides[next].className += ' active';
					self.slides[active].className = self.slides[active].className.replace(' active','');

					self.slides[next].className = self.slides[next].className.replace(' '+dr,'');
					self.slides[next].className = self.slides[next].className.replace(' '+direction,'');
					self.slides[active].className = self.slides[active].className.replace(' '+direction,'');

					if ( self.options.interval !== false && !/paused/.test(self.carousel.className) ){
						clearInterval(self.timer); self.cycle();
					}
					if (slide) { self.carousel.dispatchEvent(slide); } //here we go with the slide
				}, self.options.duration + 100 );
			} else {
				self.slides[next].className += ' active';
				self.slides[next].offsetWidth;
				self.slides[active].className = self.slides[active].className.replace(' active','');
				setTimeout(function() {
					self._addEventListeners();
					if ( self.options.interval !== false && !/paused/.test(self.carousel.className) ){
						clearInterval(self.timer); self.cycle();
					}
					if (slide) { self.carousel.dispatchEvent(slide); } //here we go with the slide
				}, self.options.duration + 100 );
			}
		},
		_addEventListeners : function () {
			var self = this;

			self.next && self.next.addEventListener( "click", self.controlsHandler, false);
			self.prev && self.prev.addEventListener( "click", self.controlsHandler, false);

			self.indicator && self.indicator.addEventListener( "click", self.indicatorHandler, false);

			if (self.options.keyboard === true) {
				window.addEventListener('keydown', self.keyHandler, false);
			}
		},
		_removeEventListeners : function () { // prevent mouse bubbles while animating
			var self = this;

			self.next && self.next.removeEventListener( "click", self.controlsHandler, false);
			self.prev && self.prev.removeEventListener( "click", self.controlsHandler, false);

			self.indicator && self.indicator.removeEventListener( "click", self.indicatorHandler, false);

			if (self.options.keyboard === true) {
				window.removeEventListener('keydown', self.keyHandler, false);
			}
		},
		_getActiveIndex : function () {
			return this.slides.indexOf(this.carousel.querySelector('.item.active'))
		},
		_curentPage: function( p ) {
			for( var i = 0; i < this.indicators.length; ++i ) {
				var a = this.indicators[i];
				a.className = "";
			}
			if (p) p.className = "active";
		},
		actions: function() {
			var self = this;
			self.indicatorHandler = function(e) {
				e.preventDefault();
				var target = e.target;
				var active = self._getActiveIndex(); // the current active

				if ( target && !/active/.test(target.className) && target.getAttribute('data-slide-to') ) {
					var n = parseInt( target.getAttribute('data-slide-to'), 10 );

					self.index = n;

					if( self.index == 0 ) {
						self.index = 0;
					} else if ( self.index == self.total - 1 ) {
						self.index = self.total - 1;
					}

					 //determine direction first
					if  ( (active < self.index ) || (active === self.total - 1 && self.index === 0 ) ) {
						self.direction = 'left'; // next
					} else if  ( (active > self.index) || (active === 0 && self.index === self.total -1 ) ) {
						self.direction = 'right'; // prev
					}
				} else { return false; }

				self._slideTo( self.index, e ); //Do the slide

			},

			self.controlsHandler = function (e) {
				var target = e.currentTarget || e.srcElement;
				e.preventDefault();

				if ( target === self.next ) {
					self.index++;
					self.direction = 'left'; //set direction first

					if( self.index == self.total - 1 ) {
						self.index = self.total - 1;
					} else if ( self.index == self.total ){
						self.index = 0
					}
				} else if ( target === self.prev ) {
					self.index--;
					self.direction = 'right'; //set direction first

					if( self.index == 0 ) {
						self.index = 0;
					} else if ( self.index < 0 ){
						self.index = self.total - 1
					}
				}

				self._slideTo( self.index, e ); //Do the slide
			}

			self.keyHandler = function (e) {

				switch (e.which) {
					case 39:
						e.preventDefault();
						self.index++;
						self.direction = 'left';
						if( self.index == self.total - 1 ) { self.index = self.total - 1; } else
						if ( self.index == self.total ){ self.index = 0 }
						break;
					case 37:
						e.preventDefault();
						self.index--;
						self.direction = 'right';
						if( self.index == 0 ) { self.index = 0; } else
						if ( self.index < 0 ){ self.index = self.total - 1 }
						break;
					default: return;
				}
				self._slideTo( self.index, e ); //Do the slide
			}
		}
	}

	// CAROUSEL DATA API
	// =================
	var Carousels = document.querySelectorAll('[data-ride="carousel"]'), i = 0, crl = Carousels.length;
	for (i;i<crl;i++) {
		var c = Carousels[i], options = {};
		options.interval = c.getAttribute('data-interval') && c.getAttribute('data-interval');
		options.pause = c.getAttribute('data-pause') && c.getAttribute('data-pause') || 'hover';
		options.keyboard = c.getAttribute('data-keyboard') && c.getAttribute('data-keyboard') || false;
		options.duration = c.getAttribute('data-duration') && c.getAttribute('data-duration') || false;
		new Carousel(c, options)
	}

	return Carousel;

});

},{}],7:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Collapse
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Collapse = factory();
	}

})(function(){

	// COLLAPSE DEFINITION
	// ===================
	var Collapse = function( element, options ) {
		options = options || {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false;
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.accordion = null;
		this.collapse = null;
		this.duration = 300; // default collapse transition duration
		this.options = {};
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);
		this.init();
	};

	// COLLAPSE METHODS
	// ================
	Collapse.prototype = {

		init : function() {
			this.actions();
      this.addEvent();
		},

		actions : function() {
			var self = this;
			var getOuterHeight = function (el) {
				var s = el && el.currentStyle || window.getComputedStyle(el), // the getComputedStyle polyfill would do this for us, but we want to make sure it does
					btp = s.borderTopWidth || 0,
					mtp = /px/.test(s.marginTop)	? Math.round(s.marginTop.replace('px',''))		: 0,
					mbp = /px/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('px',''))	: 0,
					mte = /em/.test(s.marginTop)	? Math.round(s.marginTop.replace('em','')		* parseInt(s.fontSize)) : 0,
					mbe = /em/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('em','')	* parseInt(s.fontSize)) : 0;

				return el.clientHeight + parseInt( btp ) + parseInt( mtp ) + parseInt( mbp ) + parseInt( mte ) + parseInt( mbe ); //we need an accurate margin value
			};

			this.toggle = function(e) {
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;

				if (!/in/.test(self.collapse.className)) {
					self.open(e);
				} else {
					self.close(e);
				}
			},
			this.close = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self._close(self.collapse);
				self.removeClass(self.btn,'collapsed');
			},
			this.open = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self.accordion = self.btn.getAttribute('data-parent') && self.getClosest(self.btn, self.btn.getAttribute('data-parent'));

				self._open(self.collapse);
				self.addClass(self.btn,'collapsed');

				if ( self.accordion !== null ) {
					var active = self.accordion.querySelectorAll('.collapse.in'), al = active.length, i = 0;
					for (i;i<al;i++) {
						if ( active[i] !== self.collapse) self._close(active[i]);
					}
				}
			},
			this._open = function(c) {
        self.removeEvent();
				self.addClass(c,'in');
				c.setAttribute('area-expanded','true');
				self.addClass(c,'collapsing');
				setTimeout(function() {
          var h = self.getMaxHeight(c);
					c.style.height = h + 'px';										
					c.style.overflowY = 'hidden';
				}, 0);	
				setTimeout(function() {
					c.style.height = ''; 
					c.style.overflowY = '';
					self.removeClass(c,'collapsing');
          self.addEvent();
				}, self.options.duration);
			},
			this._close = function(c) {
        self.removeEvent();
				c.setAttribute('area-expanded','false');				
				c.style.height = self.getMaxHeight(c) + 'px';				
				setTimeout(function() {
					c.style.height = '0px';		
					c.style.overflowY = 'hidden';
					self.addClass(c,'collapsing');
				}, 0);
				
				setTimeout(function() {
					self.removeClass(c,'collapsing');
					self.removeClass(c,'in'); 
					c.style.overflowY = '';
					c.style.height = '';					
          self.addEvent();
				}, self.options.duration);
			},
			this.getMaxHeight = function(l) { // get collapse trueHeight and border
				var h = 0;
				for (var k = 0, ll = l.children.length; k < ll; k++) {
					h += getOuterHeight(l.children[k]);
				}
				return h;
			},
			this.removeEvent = function() {
        this.btn.removeEventListener('click', this.toggle, false);
      },
			this.addEvent = function() {
        this.btn.addEventListener('click', this.toggle, false);
      },
			this.getTarget = function(e) {
				var t = e.currentTarget || e.srcElement,
					h = t.href && t.getAttribute('href').replace('#',''),
					d = t.getAttribute('data-target') && ( t.getAttribute('data-target') ),
					id = h || ( d && /#/.test(d)) && d.replace('#',''),
					cl = (d && d.charAt(0) === '.') && d, //the navbar collapse trigger targets a class
					c = id && document.getElementById(id) || cl && document.querySelector(cl);

				return {
					btn : t,
					collapse : c
				};
			},

			this.getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
			// source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
				var f = s.charAt(0);
				for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
					if ( f === '.' ) {// If selector is a class
						if ( document.querySelector(s) !== undefined ) { return el; }
					}
					if ( f === '#' ) { // If selector is an ID
						if ( el.id === s.substr(1) ) { return el; }
					}
				}
				return false;
			};
			this.addClass = function(el,c) {	
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
			};
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
			};
		}
	};

	// COLLAPSE DATA API
	// =================
	var Collapses = document.querySelectorAll('[data-toggle="collapse"]'), i = 0, cll = Collapses.length;
	for (i;i<cll;i++) {
		var item = Collapses[i], options = {};
		options.duration = item.getAttribute('data-duration');
		new Collapse(item,options);
	}

	return Collapse;

});

},{}],8:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Dropdown
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Dropdown = factory();
	}

})(function(root){

	// DROPDOWN DEFINITION
	// ===================
	var Dropdown = function( element) {
		this.menu = typeof element === 'object' ? element : document.querySelector(element);
		this.init();
	}

	// DROPDOWN METHODS
	// ================
	Dropdown.prototype = {

		init : function() {
			this.actions();
			this.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
      document.addEventListener('click', this.handle, false);
		},

		actions : function() {
      var self = this;
      
			this.handle = function(e) { // fix some Safari bug with <button>
        var target = e.target || e.currentTarget;
        if ( target === self.menu || target === self.menu.querySelector('span') ) { self.toggle(e); } else { self.close(200); }
        /\#$/g.test(target.href) && e.preventDefault();
      } 
      
			this.toggle = function(e) {
				if (/open/.test(this.menu.parentNode.className)) {
          this.close(0);
          document.removeEventListener('keydown', this.key, false);
				} else {
					this.menu.parentNode.className += ' open';
					this.menu.setAttribute('aria-expanded',true);
          document.addEventListener('keydown', this.key, false);
				}
			}
      
      this.key = function(e) {
        if (e.which == 27) {self.close(0);}
      }
      
			this.close = function(t) {
				setTimeout(function() { // links inside dropdown-menu don't fire without a short delay
					self.menu.parentNode.className = self.menu.parentNode.className.replace(' open','');
					self.menu.setAttribute('aria-expanded',false);
				}, t);
			}
		}
  }

	// DROPDOWN DATA API
	// =================
  var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]'), i = 0, ddl = Dropdowns.length;
	for (i;i<ddl;i++) {
		new Dropdown(Dropdowns[i]);
	}

	return Dropdown;
});

},{}],9:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Modal
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Modal = factory();
	}

})(function(){
	
	//MODAL DEFINITION
  var Modal = function(element, options) { // element is the trigger button / options.target is the modal
    options = options || {};
    this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
    this.opened = false;
    this.modal = typeof element === 'object' ? element : document.querySelector(element);
    this.options = {};
		this.options.backdrop = options.backdrop === 'false' ? false : true;
		this.options.keyboard = options.keyboard === 'false' ? false : true;
		this.options.content = options.content;
		this.duration = options.duration || 300; // the default modal fade duration option
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : this.duration;

		this.scrollbarWidth		= 0;
    this.dialog = this.modal.querySelector('.modal-dialog');
		this.timer = 0;

		this.init();
  };
	
	var getWindowWidth = function() {
		var htmlRect = document.documentElement.getBoundingClientRect(), 
			fullWindowWidth = window.innerWidth || (htmlRect.right - Math.abs(htmlRect.left));
		return fullWindowWidth;
	};
  Modal.prototype = {
		
		init : function() {			
				
			this.actions();
			this.trigger();	
			if ( this.options.content && this.options.content !== undefined ) {				
				this.content( this.options.content );
			}
		},
		
		actions : function() {
			var self = this;
			this.open = function() {
				this._open();
			},
		
			this.close = function() {
				this._close();
			},
		
			this._open = function() {
		
				if ( this.options.backdrop ) {
					this.createOverlay();
				} else { this.overlay = null }
				
				if ( this.overlay ) {
					setTimeout( function() {																
						self.addClass(self.overlay,'in');
					}, 0);						
				}
								
				clearTimeout(self.modal.getAttribute('data-timer'));
				this.timer = setTimeout( function() {
					self.modal.style.display = 'block';
					self.opened = true;
					
					self.checkScrollbar();
					self.adjustDialog();
					self.setScrollbar();
					
					self.resize();
					self.dismiss();
					self.keydown();			
					
					self.addClass(document.body,'modal-open');
					self.addClass(self.modal,'in');
					self.modal.setAttribute('aria-hidden', false);
				}, self.options.duration/2);
				this.modal.setAttribute('data-timer',self.timer);
			},
		
			this._close = function() {
							
				if ( this.overlay ) {					
					this.removeClass(this.overlay,'in');
				}			
				this.removeClass(this.modal,'in');
				this.modal.setAttribute('aria-hidden', true);
								
				clearTimeout(self.modal.getAttribute('data-timer'));
				this.timer = setTimeout( function() {
					self.opened = false;				
					self.removeClass(document.body,'modal-open');
					self.resize();
					self.resetAdjustments();
					self.resetScrollbar();			
					
					self.dismiss();
					self.keydown();										
					self.modal.style.display = '';
				}, self.options.duration/2);
				this.modal.setAttribute('data-timer',self.timer);
				
				setTimeout( function() {
					if (!document.querySelector('.modal.in')) {	self.removeOverlay(); }
				}, self.options.duration);	
			},
		
			this.content = function( content ) {
				return this.modal.querySelector('.modal-content').innerHTML = content;
			},
		
			this.createOverlay = function() {
				var backdrop = document.createElement('div'), overlay = document.querySelector('.modal-backdrop');
				backdrop.setAttribute('class','modal-backdrop fade');
		
				if ( overlay ) {
					this.overlay = overlay;
				} else {
					this.overlay = backdrop;
					document.body.appendChild(backdrop);
				}
			},
		
			this.removeOverlay = function() {
				var overlay = document.querySelector('.modal-backdrop');
				if ( overlay !== null && overlay !== undefined ) {
					document.body.removeChild(overlay)
				}
			},
		
			this.keydown = function() {
				function keyHandler(e) {
					if (self.options.keyboard && e.which == 27) {
						self.close();
					}					
				}
				if (this.opened) {
					document.addEventListener('keydown', keyHandler, false);
				} else {
					document.removeEventListener('keydown', keyHandler, false);
				}	
			},
		
			this.trigger = function() {
				var triggers = document.querySelectorAll('[data-toggle="modal"]'), tgl = triggers.length, i = 0;
				for ( i;i<tgl;i++ ) {
					triggers[i].addEventListener('click', function(e) {
						var b = e.target,
						s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#','')
						|| b.getAttribute('href') && b.getAttribute('href').replace('#','');
						if ( document.getElementById( s ) === self.modal ) {
							self.open()
						}
					})
				}
			},
		
			this._resize = function() {
				var overlay = this.overlay||document.querySelector('.modal-backdrop'),
					dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
				// setTimeout(function() {
					if ( overlay !== null && /in/.test(overlay.className) ) {
						overlay.style.height = dim.h; overlay.style.width = dim.w;
					}
				// }, self.options.duration/2)
			},
			
			this.oneResize = function() {
				function oneResize() {
					self._resize();
					self.handleUpdate();
					window.removeEventListener('resize', oneResize, false);
				}
				window.addEventListener('resize', oneResize, false);			
			},
		
			this.resize = function() {
				function resizeHandler() {
					// setTimeout(function() {
						self._resize();
						self.handleUpdate();
						console.log('offresize')
					// }, 100)
				}			

				if (this.opened) {
					window.addEventListener('resize', this.oneResize, false);
				} else {
					window.removeEventListener('resize', this.oneResize, false);
				}
					
			},
		
			this.dismiss = function() {
				function dismissHandler(e) {
					if ( e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || e.target === self.modal ) {
						e.preventDefault(); self.close()
					}
				}					
				if (this.opened) {
					this.modal.addEventListener('click', dismissHandler, false);
				} else {
					this.modal.removeEventListener('click', dismissHandler, false);
				}	
			},
		
			// these following methods are used to handle overflowing modals
			
			this.handleUpdate = function () {
				this.adjustDialog(); 
			},
			
			this.adjustDialog = function () {
				this.modal.style.paddingLeft = !this.bodyIsOverflowing && this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';
				this.modal.style.paddingRight = this.bodyIsOverflowing && !this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';
			},
			
			this.resetAdjustments = function () {
				this.modal.style.paddingLeft = '';
				this.modal.style.paddingRight = '';
			},
			
			this.checkScrollbar = function () {	
				this.bodyIsOverflowing = document.body.clientWidth < getWindowWidth();
				this.modalIsOverflowing = this.modal.scrollHeight > document.documentElement.clientHeight;
				this.scrollbarWidth = this.measureScrollbar();
			},
			
			this.setScrollbar = function () {
				var bodyStyle = window.getComputedStyle(document.body), bodyPad = parseInt((bodyStyle.paddingRight), 10);
				if (this.bodyIsOverflowing) { document.body.style.paddingRight = (bodyPad + this.scrollbarWidth) + 'px'; }
			},
			
			this.resetScrollbar = function () {
				document.body.style.paddingRight = '';
			},
			
			this.measureScrollbar = function () { // thx walsh
				var scrollDiv = document.createElement('div');
				scrollDiv.className = 'modal-scrollbar-measure';
				document.body.appendChild(scrollDiv);
				var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
				document.body.removeChild(scrollDiv);
				return scrollbarWidth;
			},
			
			this.addClass = function(el,c) {	
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
			},
			
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
			}
		}
	};	
	
	// DATA API
	var Modals = document.querySelectorAll('.modal'), mdl = Modals.length, i = 0;
	for ( i;i<mdl;i++ ) {
		var modal = Modals[i], options = {};
		options.keyboard = modal.getAttribute('data-keyboard');
		options.backdrop = modal.getAttribute('data-backdrop');
		options.duration = modal.getAttribute('data-duration');
		new Modal(modal,options)
	}

	return Modal;

});

},{}],10:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Popover
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Popover = factory();
	}

})(function(){

	// POPOVER DEFINITION
	// ===================
	var Popover = function( element,options ) {
		options = options || {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
		this.link = typeof element === 'object' ? element : document.querySelector(element);
		this.title = this.link.getAttribute('data-title') || null;
		this.content = this.link.getAttribute('data-content') || null;
		this.popover = null;
		this.options = {};
		this.options.template = options.template ? options.template : null;
		this.options.trigger = options.trigger ? options.trigger : 'hover';
		this.options.animation = options.animation && options.animation !== 'true' ? options.animation : 'true';
		this.options.placement = options.placement ? options.placement : 'top';
		this.options.delay = parseInt(options.delay) || 100;
		this.options.dismiss = options.dismiss && options.dismiss === 'true' ? true : false;		
		this.duration = 150;
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);
		this.options.container = document.body;
		if ( this.content || this.options.template ) this.init();
		this.timer = 0 // the link own event timer
		this.rect = null;
	}

	// POPOVER METHODS
	// ================
	Popover.prototype = {

		init : function() {
			this.actions();
      var events = ('onmouseleave' in this.link) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

			if (this.options.trigger === 'hover') {
				this.link.addEventListener(events[0], this.open, false);
				if (!this.options.dismiss) { this.link.addEventListener(events[1], this.close, false); }
			} else if (this.options.trigger === 'click') {
				this.link.addEventListener('click', this.toggle, false);
				if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false); }					
			} else if (this.options.trigger === 'focus') {
				this.link.addEventListener('focus', this.toggle, false);
				if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false);	}
			}
			
			if (this.options.dismiss) {	document.addEventListener('click', this.dismiss, false); }
				
			if (!(this.isIE && this.isIE < 9) ) { // dismiss on window resize 
				window.addEventListener('resize', this.close, false ); 
      } 
		},

		actions : function() {
			var self = this;

			this.toggle = function(e) {
				if (self.popover === null) {
					self.open()
				} else {
					self.close()
				}
			},
			this.open = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.popover === null) {
						self.createPopover();
						self.stylePopover();
						self.updatePopover()
					}
				}, self.options.duration );
				self.link.setAttribute('data-timer',self.timer);
			},
			this.dismiss = function(e) {
				if (self.popover && e.target === self.popover.querySelector('.close')) {					
					self.close();
				}
			},
			this.close = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.popover && self.popover !== null && /in/.test(self.popover.className)) {
						self.popover.className = self.popover.className.replace(' in','');
						setTimeout(function() {
							self.removePopover(); // for performance/testing reasons we can keep the popovers if we want
						}, self.options.duration);
					}

				}, self.options.delay + self.options.duration);
				self.link.setAttribute('data-timer',self.timer);
			},

			//remove the popover
			this.removePopover = function() {
				this.popover && this.options.container.removeChild(this.popover);
				this.popover = null;
				this.timer = null
			},

			this.createPopover = function() {
				this.popover = document.createElement('div');

				if ( this.content !== null && this.options.template === null ) { //create the popover from data attributes

					this.popover.setAttribute('role','tooltip');

					var popoverArrow = document.createElement('div');
					popoverArrow.setAttribute('class','arrow');

					if (this.title !== null) {
						var popoverTitle = document.createElement('h3');
						popoverTitle.setAttribute('class','popover-title');
						
						if (this.options.dismiss) {
							popoverTitle.innerHTML = this.title + '<button type="button" class="close">×</button>';
						} else {
							popoverTitle.innerHTML = this.title;
						}
						this.popover.appendChild(popoverTitle);
					}

					var popoverContent = document.createElement('div');
					popoverContent.setAttribute('class','popover-content');

					this.popover.appendChild(popoverArrow);
					this.popover.appendChild(popoverContent);

					//set popover content
					if (this.options.dismiss && this.title === null) {
						popoverContent.innerHTML = this.content + '<button type="button" class="close">×</button>';
					} else {
						popoverContent.innerHTML = this.content;
					}

				} else {  // or create the popover from template
					var template = document.createElement('div');
					template.innerHTML = this.options.template;
					this.popover.innerHTML = template.firstChild.innerHTML;
				}

				//append to the container
				this.options.container.appendChild(this.popover);
				this.popover.style.display = 'block';
			},

			this.stylePopover = function(pos) {
				this.rect = this.getRect();
				var placement = pos || this.options.placement;
				var animation = this.options.animation === 'true' ? 'fade' : '';
				this.popover.setAttribute('class','popover '+placement+' '+animation);

				var linkDim = { w: this.link.offsetWidth, h: this.link.offsetHeight }; //link real dimensions

				// all popover dimensions
				var pd = this.popoverDimensions(this.popover);
				var toolDim = { w : pd.w, h: pd.h }; //popover real dimensions


				//window vertical and horizontal scroll

				var scrollYOffset = this.getScroll().y;
				var scrollXOffset =  this.getScroll().x;

				//apply styling
				if ( /top/.test(placement) ) { //TOP
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px'

				} else if ( /bottom/.test(placement) ) { //BOTTOM
					this.popover.style.top = this.rect.top + scrollYOffset + linkDim.h + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px';

				} else if ( /left/.test(placement) ) { //LEFT
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w + 'px';

				} else if ( /right/.test(placement) ) { //RIGHT
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset + linkDim.w + 'px';
				}
			},

			this.updatePopover = function() {
				var placement = null;
				if ( !self.isElementInViewport(self.popover) ) {
					placement = self.updatePlacement();
				} else {
					placement = self.options.placement;
				}

				self.stylePopover(placement);

				self.popover.className += ' in';
			},
			this.updatePlacement = function() {
				var pos = this.options.placement;
				if ( /top/.test(pos) ) { //TOP
					return 'bottom';
				} else if ( /bottom/.test(pos) ) { //BOTTOM
					return 'top';
				} else if ( /left/.test(pos) ) { //LEFT
					return 'right';
				} else if ( /right/.test(pos) ) { //RIGHT
					return 'left';
				}
			},
			this.getRect = function() {
				return this.link.getBoundingClientRect()
			},
			this.getScroll = function() {
				return {
					y : window.pageYOffset || document.documentElement.scrollTop,
					x : window.pageXOffset || document.documentElement.scrollLeft
				}
			},
			this.popoverDimensions	= function(p) {//check popover width and height
				return {
					w : p.offsetWidth,
					h : p.offsetHeight
				}
			},
			this.isElementInViewport = function(t) { // check if this.popover is in viewport
				var r = t.getBoundingClientRect();
				return (
					r.top >= 0 &&
					r.left >= 0 &&
					r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					r.right <= (window.innerWidth || document.documentElement.clientWidth)
				)
			}
		}
    }

	// POPOVER DATA API
	// =================
    var Popovers = document.querySelectorAll('[data-toggle=popover]'), i = 0, ppl = Popovers.length;
	for (i;i<ppl;i++){	
		var item = Popovers[i], options = {};
		options.trigger = item.getAttribute('data-trigger'); // click / hover / focus
		options.animation = item.getAttribute('data-animation'); // true / false
		options.duration = item.getAttribute('data-duration');
		options.placement = item.getAttribute('data-placement');
		options.dismiss = item.getAttribute('data-dismiss');
		options.delay = item.getAttribute('data-delay');
		new Popover(item,options);
	}

	return Popover;

});

},{}],11:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | ScrollSpy
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.ScrollSpy = factory();
	}

})(function(){

	//SCROLLSPY DEFINITION
	var ScrollSpy = function(element,item,options) {
		options = options || {};
		
		//this is the container element we spy it's elements on
		this.element = typeof element === 'object' ? element : document.querySelector(element);

		this.options = {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false;
		// this is the UL menu component our scrollSpy object will target, configure and required by the container element
		this.options.target = options.target ? (typeof options.target === 'object' ? options.target : document.querySelector(options.target)) : null;

		//we need to determine the index of each menu item
		this.items = this.options.target && this.options.target.getElementsByTagName('A');

		this.item = item;
		// the parent LI element
		this.parent = this.item.parentNode;

		// the upper level LI ^ UL ^ LI, this is required for dropdown menus
		this.parentParent = this.parent.parentNode.parentNode;

		this.tg = this.item.href && document.getElementById(this.item.getAttribute('href').replace('#',''));
		this.active = false;
		this.topEdge = 0;
		this.bottomEdge = 0;

		//determine which is the real scrollTarget
		if ( this.element.offsetHeight < this.element.scrollHeight ) { // or this.scrollHeight()
			this.scrollTarget = this.element;
		} else {
			this.scrollTarget = window;
		}

		if ( this.options.target ) {
			this.init();
		}
	};

	//SCROLLSPY METHODS
	ScrollSpy.prototype = {
		init: function () {
			if ( this.item.getAttribute('href') && this.item.getAttribute('href').indexOf('#') > -1 ) {
				//actions
				this.checkEdges();
				this.refresh()
				this.scrollEvent();
				if (!(this.isIE && this.isIE < 9)) { this.resizeEvent(); }
			}
		},
		topLimit: function () { // the target offset
			if ( this.scrollTarget === window ) {
				return this.tg.getBoundingClientRect().top + this.scrollOffset() - 5
			} else {
				return this.tg.offsetTop;
			}

		},
		bottomLimit: function () {
			return this.topLimit() + this.tg.clientHeight
		},
		checkEdges: function () {
			this.topEdge = this.topLimit();
			this.bottomEdge = this.bottomLimit()
		},
		scrollOffset: function () {
			if ( this.scrollTarget === window ) {
				return window.pageYOffset || document.documentElement.scrollTop
			} else {
				return this.element.scrollTop
			}
		},
		activate: function () {
			if ( this.parent && this.parent.tagName === 'LI' && !/active/.test(this.parent.className) ) {
				this.addClass(this.parent,'active');
				if ( this.parentParent && this.parentParent.tagName === 'LI' // activate the dropdown as well
					&& /dropdown/.test(this.parentParent.className)
					&& !/active/.test(this.parentParent.className) ) { this.addClass(this.parentParent,'active'); }
				this.active = true
			}
		},
		deactivate: function () {
			if ( this.parent && this.parent.tagName === 'LI' && /active/.test(this.parent.className) ) {
				this.removeClass(this.parent,'active');
				if ( this.parentParent && this.parentParent.tagName === 'LI' // deactivate the dropdown as well
					&& /dropdown/.test(this.parentParent.className)
					&& /active/.test(this.parentParent.className) ) { this.removeClass(this.parentParent,'active'); }
				this.active = false
			}
		},
		toggle: function () {
			if ( this.active === false
				&& ( this.bottomEdge > this.scrollOffset() && this.scrollOffset() >= this.topEdge )) { //regular use, scroll just entered the element's topLimit or bottomLimit
					this.activate();
			} else if (this.active === true && (this.bottomEdge <= this.scrollOffset() && this.scrollOffset() < this.topEdge )) {
				this.deactivate()
			}
		},
		refresh : function () { // check edges again
			this.deactivate();
			this.checkEdges();

			this.toggle() // If any case update values again
		},
		scrollEvent : function(){
			var self = this;
			this.scrollTarget.addEventListener('scroll', onSpyScroll, false);
			function onSpyScroll() {
				self.refresh();
			}
		},
		resizeEvent : function(){
			var self = this;
			window.addEventListener('resize', onSpyResize, false);
			function onSpyResize() {
				self.refresh()
			}
		},
		scrollHeight : function() {
			if ( this.scrollTarget === window ) {
				return Math.max( document.body.scrollHeight, document.body.offsetHeight, 
					document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
			} else {
				return this.element.scrollHeight
			}
		},
		addClass : function(el,c) {	
			if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
		},
		removeClass : function(el,c) {
			if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
		}	
	};


	//SCROLLSPY API
	//=============
	var scrollSpyes = document.querySelectorAll('[data-spy="scroll"]'), i = 0, ssl = scrollSpyes.length; // mostly is the document.body or a large container with many elements having id="not-null-id"
	for (i;i<ssl;i++) {
		var spy = scrollSpyes[i], options = {};
		options.target = spy.getAttribute('data-target') || null;	// this must be a .nav component with id="not-null"	
		if ( options.target !== null ) {
			var menu = options.target === 'object' ?  options.target : document.querySelector(options.target),
				items = menu.querySelectorAll('a'), j = 0, il = items.length;
			for (j;j<il;j++) {
				var item = items[j];
				if ( item.href && item.getAttribute('href') !== '#' )
				new ScrollSpy(spy, item, options);
			}
		}
	}

	return ScrollSpy;

});

},{}],12:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Tab
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Tab = factory();
	}

})(function(){

	// TAB DEFINITION
	// ===================
	var Tab = function( element,options ) {
		options = options || {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
		this.tab = typeof element === 'object' ? element : document.querySelector(element);
		this.tabs = this.tab.parentNode.parentNode;
		this.dropdown = this.tabs.querySelector('.dropdown');
		if ( /dropdown-menu/.test(this.tabs.className) ) {
			this.dropdown = this.tabs.parentNode;
			this.tabs = this.tabs.parentNode.parentNode;
		}
		this.options = options;

		// default tab transition duration
		this.duration = 150;
		this.options.duration = (this.isIE && this.isIE < 10)  ? 0 : (options.duration || this.duration);
		this.init();
	}

	// TAB METHODS
	// ================
	Tab.prototype = {

		init : function() {
			this.actions();
			this.tab.addEventListener('click', this.action, false);
		},

		actions : function() {
			var self = this;

			this.action = function(e) {
				e = e || window.e; e.preventDefault();
				var next = e.target; //the tab we clicked is now the next tab
				var nextContent = document.getElementById(next.getAttribute('href').replace('#','')); //this is the actual object, the next tab content to activate
				var isDropDown = new RegExp('(?:^|\\s)'+ 'dropdown-menu' +'(?!\\S)');
				
				// get current active tab and content
				var activeTab = self.getActiveTab();
				var activeContent = self.getActiveContent();

				if ( !/active/.test(next.parentNode.className) ) {
					// toggle "active" class name
					self.removeClass(activeTab,'active');
					self.addClass(next.parentNode,'active');		
	
					// handle dropdown menu "active" class name		
					if ( self.dropdown ) {
						if ( !(isDropDown.test(self.tab.parentNode.parentNode.className)) ) {
							if (/active/.test(self.dropdown.className)) self.removeClass(self.dropdown,'active');
						} else {
							if (!/active/.test(self.dropdown.className)) self.addClass(self.dropdown,'active');
						}
					}
	
					//1. hide current active content first
					self.removeClass(activeContent,'in');
					
					setTimeout(function() { // console.log(self)
						//2. toggle current active content from view
						self.removeClass(activeContent,'active');
						self.addClass(nextContent,'active');
					}, self.options.duration);
					setTimeout(function() {
						//3. show next active content
						self.addClass(nextContent,'in');
					}, self.options.duration*2);
				}
			},
			this.addClass = function(el,c) {
				if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
			},
			this.removeClass = function(el,c) {
				if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,''); }
			},
			this.getActiveTab = function() {
				var activeTabs = this.tabs.querySelectorAll('.active');
				if ( activeTabs.length === 1 && !/dropdown/.test(activeTabs[0].className) ) {
					return activeTabs[0]
				} else if ( activeTabs.length > 1 ) {
					return activeTabs[activeTabs.length-1]
				}
			},
			this.getActiveContent = function() {
				var a = this.getActiveTab().getElementsByTagName('A')[0].getAttribute('href').replace('#','');
				return a && document.getElementById(a)
			}
		}
	}


	// TAB DATA API
	// =================
    var Tabs = document.querySelectorAll("[data-toggle='tab'], [data-toggle='pill']"), tbl = Tabs.length, i=0;
	for ( i;i<tbl;i++ ) {
		var tab = Tabs[i], options = {};
		options.duration = tab.getAttribute('data-duration') && tab.getAttribute('data-duration') || false;
		new Tab(tab,options);
	}

	return Tab;

});

},{}],13:[function(require,module,exports){
// Native Javascript for Bootstrap 3 | Tooltip
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Tooltip = factory();
	}

})(function(root){

	// TOOLTIP DEFINITION
	// ===================
	var Tooltip = function( element,options ) {
		options = options || {};
		
		this.link = typeof element === 'object' ? element : document.querySelector(element);
		this.title = this.link.getAttribute('title') || this.link.getAttribute('data-original-title');
		this.tooltip = null;
		this.options = {};
		this.options.animation = options.animation && options.animation !== 'fade' ? options.animation : 'fade';
		this.options.placement = options.placement ? options.placement : 'top';
		this.options.delay = parseInt(options.delay) || 100;
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false;
		this.duration = 150;
		this.options.duration = this.isIE && this.isIE < 10 ? 0 : (options.duration || this.duration);
		this.options.container = options.container || document.body;
		if ( this.title ) this.init();
		this.timer = 0 // the link own event timer
	}

	// TOOLTIP METHODS
	// ================
	Tooltip.prototype = {

		init : function() {
			this.actions();
			this.rect = null;
		  var events = ('onmouseleave' in this.link) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];
			this.link.addEventListener(events[0], this.open, false);
			this.link.addEventListener(events[1], this.close, false);
      
			//remove title from link
			this.link.setAttribute('data-original-title',this.title);
			this.link.removeAttribute('title');

		},

		actions : function() {
			var self = this;

			this.open = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.tooltip === null) {
						self.createToolTip();
						self.styleTooltip();
						self.updateTooltip()
					}
				}, self.options.duration );
				self.link.setAttribute('data-timer',self.timer);
			},

			this.close = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.tooltip && self.tooltip !== null) {
						self.tooltip.className = self.tooltip.className.replace(' in','');
						setTimeout(function() {
							self.removeToolTip(); // for performance/testing reasons we can keep the tooltips if we want
						}, self.options.duration);
					}

				}, self.options.delay + self.options.duration);
				self.link.setAttribute('data-timer',self.timer);
			},

			//remove the tooltip
			this.removeToolTip = function() {
				this.tooltip && this.options.container.removeChild(this.tooltip);
				this.tooltip = null;
			},

			//create the tooltip structure
			this.createToolTip = function() {
				this.tooltip = document.createElement('div');
				this.tooltip.setAttribute('role','tooltip');

				var tooltipArrow = document.createElement('div');
				tooltipArrow.setAttribute('class','tooltip-arrow');
				var tooltipInner = document.createElement('div');
				tooltipInner.setAttribute('class','tooltip-inner');

				this.tooltip.appendChild(tooltipArrow);
				this.tooltip.appendChild(tooltipInner);

				//set tooltip content
				tooltipInner.innerHTML = this.title;

				//append to the container
				this.options.container.appendChild(this.tooltip);
			},

			this.styleTooltip = function(pos) {
				this.rect = this.getRect();
				var placement = pos || this.options.placement;
				this.tooltip.setAttribute('class','tooltip '+placement+' '+this.options.animation);

				var linkDim = { w: this.link.offsetWidth, h: this.link.offsetHeight }; //link real dimensions

				// all tooltip dimensions
				var td = this.tooltipDimensions(this.tooltip);
				var toolDim = { w : td.w, h: td.h }; //tooltip real dimensions

				//window vertical and horizontal scroll
				var scrollYOffset = this.getScroll().y;
				var scrollXOffset =  this.getScroll().x;

				//apply styling
				if ( /top/.test(placement) ) { //TOP
					this.tooltip.style.top = this.rect.top + scrollYOffset - toolDim.h + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px'

				} else if ( /bottom/.test(placement) ) { //BOTTOM
					this.tooltip.style.top = this.rect.top + scrollYOffset + linkDim.h + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px';

				} else if ( /left/.test(placement) ) { //LEFT
					this.tooltip.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset - toolDim.w + 'px';

				} else if ( /right/.test(placement) ) { //RIGHT
					this.tooltip.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.tooltip.style.left = this.rect.left + scrollXOffset + linkDim.w + 'px';
				}
			},

			this.updateTooltip = function() {
				var placement = null;
				if ( !this.isElementInViewport(this.tooltip) ) {
					placement = this.updatePlacement();
				} else {
					placement = this.options.placement;
				}

				this.styleTooltip(placement);
				this.tooltip.className += ' in';
			},
			this.updatePlacement = function() {
				var pos = this.options.placement;
				if ( /top/.test(pos) ) { //TOP
					return 'bottom';
				} else if ( /bottom/.test(pos) ) { //BOTTOM
					return 'top';
				} else if ( /left/.test(pos) ) { //LEFT
					return 'right';
				} else if ( /right/.test(pos) ) { //RIGHT
					return 'left';
				}
			},
			this.getRect = function() {
				return this.link.getBoundingClientRect()
			},
			this.getScroll = function() {
				return {
					y : window.pageYOffset || document.documentElement.scrollTop,
					x : window.pageXOffset || document.documentElement.scrollLeft
				}
			},
			this.tooltipDimensions	= function(t) {//check tooltip width and height
				return {
					w : t.offsetWidth,
					h : t.offsetHeight
				}
			},
			this.isElementInViewport = function(t) { // check if this.tooltip is in viewport
				var r = t.getBoundingClientRect();
				return (
					r.top >= 0 &&
					r.left >= 0 &&
					r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					r.right <= (window.innerWidth || document.documentElement.clientWidth)
				)
			}
		}
    }

	// TOOLTIP DATA API
	// =================
    var Tooltips = document.querySelectorAll('[data-toggle=tooltip]'), i = 0, tpl = Tooltips.length;
	for (i;i<tpl;i++){	
		var item = Tooltips[i], options = {};
		options.animation = item.getAttribute('data-animation');
		options.placement = item.getAttribute('data-placement');
		options.duration = item.getAttribute('data-duration');
		options.delay = item.getAttribute('data-delay');
		new Tooltip(item,options);
	}

	return Tooltip;

});

},{}],14:[function(require,module,exports){

var app = angular.module('DSP', [
  'ngRoute', require( 'angular-bootstrap-npm' )
]);


/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "templates/pages/home.html", controller: "PageCtrl"})
    // Pages
    .when("/fraternitylife", {templateUrl: "templates/pages/fraternitylife.html", controller: "PageCtrl"})
    .when("/about", {templateUrl: "templates/pages/about.html", controller: "PageCtrl"})
    .when("/recruitment", {templateUrl: "templates/pages/recruitment.html", controller: "PageCtrl"})
    .when("/alumni", {templateUrl: "templates/pages/alumni.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "templates/pages/login.html", controller: "PageCtrl"})
    .when("/scholarship", {templateUrl: "templates/pages/scholarship.html", controller: "PageCtrl"})

    .otherwise("/404", {templateUrl: "templates/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");



});

app.controller('scholarship', function() {
// fill the pdf form
  // var pdfFiller = require('pdffiller');

  function scholarship() {
    var firstname = document.getElementById(firstname).value;
    var lastname = document.getElementById(lastname).value;
    var email = document.getElementById(email).value;
    var phone = document.getElementById(phone).value;
    var addressline = document.getElementById(addressline).value;
    var city = document.getElementById(city).value;
    var state = document.getElementById(state).value;
    var zip = document.getElementById(zip).value;
    var birthday = document.getElementById(birthday).value;
    var highschool = document.getElementById(highschool).value;
    var classrank = document.getElementById(classrank).value;
    var gpa = document.getElementById(gpa).value;
    var year = document.getElementById(year).value;
    var major = document.getElementById(major).value;
    var honors = document.getElementById(honors).value;
    var service = document.getElementById(service).value;
    var essay = document.getElementById(essay).value;

    var sourcePDF = "files/scholarship.pdf";
    var destinationPDF =  "files/scholarship_complete.pdf";
    var shouldFlatten = true;
    var data = {
      "firstname" : firstname,
      "lastname" : lastname,
      "email" : email,
      "phone" : phone,
      "addressline" : addressline,
      "city" : city,
      "state" : state,
      "zip" : zip,
      "birthday" : birthday,
      "highschool" : highschool,
      "classrank" : classrank,
      "gpa" : gpa,
      "year" : year,
      "major" : major,
      "honors" : honors,
      "service" : service,
      "essay" : essay
    };
   
    pdfFiller.fillForm( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
      if (err) throw err;
      console.log("In callback (we're done).");
    });
  };
});

app.controller('nav', function() {

   require("bootstrap.native");

});



app.controller('recruitment', function() {

   //require("bootstrap.native");

});


},{"angular-bootstrap-npm":1,"bootstrap.native":2}]},{},[14]);
