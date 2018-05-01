module.exports = {
  capFirst: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  forProp: function(template, entity) {
    let result = '';
    entity.props.forEach(prop => result += template(prop));
    return result;
  },

  forEntity: function(template, desc) {
    let result = '';
    desc.entities.forEach(entity => result += template(entity));
    return result;
  }
}
