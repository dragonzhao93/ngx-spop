var animationTime = 390;
var options, defaults, container, icon, layout, popStyle, positions, close;
var spop = {defaults:{}}
export class SmallPop {
  defaults:any;
  opt:any;
  popContainer:any;
  pop:any;
  autocloseTimer:any;
  constructor(template: any, style?: any) { 
    this.defaults = {
      template: null,
      style: 'info',
      autoclose: false,
      position: 'top-right',
      icon: true,
      group: false,
      onOpen: false,
      onClose: false
    };

    defaults = extend(this.defaults, spop.defaults);

    if (typeof template === 'string' || typeof style === 'string') {
      options = { template: template, style: style || defaults.style };
    } else if (typeof template === 'object') {
      options = template;
    } else {
      console.error('Invalid arguments.');
    }

    this.opt = extend(defaults, options);

    if ($('spop--' + this.opt.group)) {

      this.remove($('spop--' + this.opt.group));
    }
    this.open();
    return this;
  }
  create (template) {

    container = $(this.getPosition('spop--', this.opt.position));

    icon = (!this.opt.icon) ? '' : '<i class="spop-icon ' +
      this.getStyle('spop-icon--', this.opt.style) + '"></i>';

    layout = '<div class="spop-close" data-spop="close" aria-label="Close">&times;</div>' +
      icon +
      '<div class="spop-body">' +
      template +
      '</div>';

    if (!container) {

      this.popContainer = document.createElement('div');

      this.popContainer.setAttribute('class', 'spop-container ' +
        this.getPosition('spop--', this.opt.position));

      this.popContainer.setAttribute('id', this.getPosition('spop--', this.opt.position));

      document.body.appendChild(this.popContainer);

      container = $(this.getPosition('spop--', this.opt.position));
    }

    this.pop = document.createElement('div');

    this.pop.setAttribute('class', 'spop spop--out spop--in ' + this.getStyle('spop--', this.opt.style));

    if (this.opt.group && typeof this.opt.group === 'string') {
      this.pop.setAttribute('id', 'spop--' + this.opt.group);
    }


    this.pop.setAttribute('role', 'alert');

    this.pop.innerHTML = layout;

    container.appendChild(this.pop);
  };

  getStyle (sufix, arg) {

    popStyle = {
      'success': 'success',
      'error': 'error',
      'warning': 'warning'
    };
    return sufix + (popStyle[arg] || 'info');
  };

  getPosition (sufix, position) {

    positions = {
      'top-left': 'top-left',
      'top-center': 'top-center',
      'top-right': 'top-right',
      'bottom-left': 'bottom-left',
      'bottom-center': 'bottom-center',
      'bottom-right': 'bottom-right'
    };
    return sufix + (positions[position] || 'top-right');
  };

  open () {

    this.create(this.opt.template);

    if (this.opt.onOpen) { this.opt.onOpen(); }

    this.close();
  };

  close () {
    if (this.opt.autoclose && typeof this.opt.autoclose === 'number') {

      this.autocloseTimer = setTimeout(this.remove.bind(this, this.pop), this.opt.autoclose);
    }

    this.pop.addEventListener('click', this.addListeners.bind(this), false);
  };

  addListeners (event) {

    close = event.target.getAttribute('data-spop');

    if (close === 'close') {

      if (this.autocloseTimer) { clearTimeout(this.autocloseTimer); }

      this.remove(this.pop);
    }
  };

  remove (elm) {

    if (this.opt.onClose) { this.opt.onClose(); }

    removeClass(elm, 'spop--in');

    setTimeout(function () {

      if (document.body.contains(elm)) {
        elm.parentNode.removeChild(elm);
      }

    }, animationTime);
  };
}
function $(el, con?) {
  return typeof el === 'string' ? (con || document).getElementById(el) : el || null;
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' +
      className.split(' ').join('|') +
      '(\\b|$)', 'gi'), ' ');
  }
}

function extend(obj, src) {

  for (var key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key];
  }

  return obj;
}