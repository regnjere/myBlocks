
Blockly.Blocks['import_turtle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Import Turtle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip("imports the turtle module");
  }
  mutationToDom() {

      $("[name='Turtle'] > *").attr("disabled",false);

    return container;
  }
};
Blockly.Blocks['my_custom_block'] = {
  init() {
    // Define your basic block stuff here
  },
  // Mutator functions
  mutationToDom() {
    let container = document.createElement('mutation');

    // Bind some values to container e.g. container.setAttribute('foo', 3.14);

    return container;
  },
  domToMutation(xmlElement) {
    // Retrieve all attributes from 'xmlElement' and reshape your block
    // e.g. let foo = xmlElement.getAttribute('foo');
    // this.reshape(foo);
  },
  // Aux functions
  reshape(param){
    // Reshape your block...
  }
}