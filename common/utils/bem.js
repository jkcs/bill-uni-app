export const ELEMENT = '__'
export const MODS = '--'

export const createNameSpace = (name) => {
  return createBEM(name)
}

function prefix(name, mods) {
  if (typeof mods === 'string') {
    return join(name, mods, MODS)
  }

  if (Array.isArray(mods)) {
    return mods.map(item => prefix(name, item))
  }

  const ret = {};
  if (mods) {
    Object.keys(mods).forEach(key => {
      ret[name + MODS + key] = mods[key];
    });
  }

  return ret
}

export const join = (name, el, symbol) =>  {
  return el ? name + symbol + el : name;
}

export const createBEM = (name) => {
  return function(el, mods) {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }
    el = join(name, el, ELEMENT);

    return mods ? [el, prefix(el, mods)] : el;
  };
}
