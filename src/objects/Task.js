
//
// const Factory = new Proxy({}, {
//     get: function get(target, prop) {
//      console.log(prop);
//      return prop;
//     }
// });

class Task {
  #nodeName = "";
  #childNodes = [];
  #parentNode = null;

  constructor(nodeName, ...childNodes) {
    this.#nodeName = nodeName;
    for (const childNode of childNodes) {
      this.appendChild(childNode);
    }
  }

  appendChild(node) {
    node.parent = this;
    this.#childNodes.push(node);
  }

  parents(){
    const response = [];

    let node = this;
    while(node){
      response.push(node.name)
      node = node.parent;
    }

    return response;
  }

  async make(){
    console.log(`${'  '.repeat(this.parents().length)}Entered: ${this.#nodeName}`);
    const resolved = await Promise.all( this.#childNodes.map(childNode=>childNode.make()) );
    return resolved;
  }


  get name(){return this.#nodeName;}
  // No setter; read-only property

  get parent(){return this.#parentNode;}
  set parent(node){this.#parentNode = node;}
}

export default Task;
