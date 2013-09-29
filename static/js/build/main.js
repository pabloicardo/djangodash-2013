// Generated by CoffeeScript 1.6.3
(function() {
  var fRoll, roll;

  fRoll = (function() {
    function fRoll() {
      this.currentStep = 0;
      this.stepNumber = 0;
      this.isAnimating = false;
      this.BreadCrumbEl = $('#breadcrumb');
      this.BreadCrumbProgress = this.BreadCrumbEl.find('.progress');
      this.StepsEl = $('#steps > li');
      this.init();
    }

    fRoll.prototype.init = function() {
      var input;
      input = this.StepsEl.filter('#intro').find('input');
      return input.typeahead({
        name: 'asda',
        minLength: 0,
        local: window.generators,
        template: ['<p class="repo-language">{{language}}</p>', '<p class="repo-name">{{options.project_name}}</p>', '<p class="repo-description">{{description}}</p>'].join(''),
        engine: Hogan
      });
    };

    fRoll.prototype.loadGenerator = function(id_generator) {
      this.BreadCrumbEl.fadeIn();
      this.stepNumber = 4;
      this.initBreadCrumb();
      return this.goNext();
    };

    fRoll.prototype.initBreadCrumb = function() {
      var b_width, bullet, i, _i, _ref, _results;
      b_width = this.BreadCrumbEl.width();
      _results = [];
      for (i = _i = 0, _ref = this.stepNumber - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        bullet = $('<span />').css({
          left: "" + (100 * i / (this.stepNumber - 1)) + "%"
        });
        if (i === 0) {
          bullet.addClass('done current');
        }
        _results.push(bullet.appendTo(this.BreadCrumbEl));
      }
      return _results;
    };

    fRoll.prototype.progressBreadCrumb = function(step_number) {
      var bullet_step;
      bullet_step = this.BreadCrumbEl.find('span').eq(step_number);
      this.BreadCrumbEl.find('span').removeClass('current');
      bullet_step.addClass('current');
      return this.BreadCrumbProgress.animate({
        width: bullet_step[0].style.left
      }, 500, function() {
        return bullet_step.addClass('done');
      });
    };

    fRoll.prototype.goNext = function() {
      var input;
      input = this.getStep(this.currentStep).find('input');
      if (!input.val() & this.currentStep > 0) {
        input.addClass('error');
        return;
      }
      input.removeClass('error');
      return this.jumpTo(this.currentStep + 1);
    };

    fRoll.prototype.getStep = function(n) {
      return this.StepsEl.eq(n);
    };

    fRoll.prototype.jumpTo = function(newStep) {
      var in_effect, out_effect, self;
      if (this.isAnimating) {
        return false;
      }
      if (newStep > this.stepNumber - 1) {
        return false;
      }
      self = this;
      this.isAnimating = true;
      this.progressBreadCrumb(newStep);
      out_effect = newStep > this.currentStep ? 'moveToLeftFade' : 'moveToRightFade';
      in_effect = newStep > this.currentStep ? 'moveFromRightFade' : 'moveFromLeftFade';
      this.getStep(this.currentStep).addClass(out_effect).on('webkitAnimationEnd', function() {
        $(this).off('webkitAnimationEnd');
        $(this).removeClass("" + out_effect + " current");
        return self.isAnimating = false;
      });
      this.getStep(newStep).addClass(in_effect).on('webkitAnimationEnd', function() {
        $(this).off('webkitAnimationEnd');
        $(this).removeClass(in_effect);
        return self.isAnimating = false;
      });
      this.getStep(newStep).addClass('current');
      return this.currentStep = newStep;
    };

    return fRoll;

  })();

  roll = new fRoll;

  $('a.next').on('click', function() {
    return roll.goNext();
  });

  $('a.start').on('click', function() {
    return roll.loadGenerator(5);
  });

}).call(this);

/*
//@ sourceMappingURL=main.map
*/
