let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

// let items = [
//   {
//     id:getId(),
//     name:'HHD-Quatumn',
//     description:'HHD is not SSD',
//     status:0,
//     useDate:'89'
//   },
//   {
//     id:getId(),
//     name:'CPU-HRP',
//     description:'CPU 809 duo core',
//     status:0,
//     useDate:'45'
//   },
//   {
//     id:getId(),
//     name:'RAM-DDR5',
//     description:'8GB',
//     status:1,
//     useDate:'3'
//   },
//   {
//     id:getId(),
//     name:'RAM-DDR3',
//     description:'4GB',
//     status:1,
//     useDate:'45'
//   },
//   {
//     id:getId(),
//     name:'Fan-SX',
//     description:'Super strong',
//     status:0,
//     useDate:'67'
//   }
// ];
import data from '!./data.json'
let items=data;

export class WebAPI {
  isRequesting = false;

  getList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = items.map(x =>  { return {
          id:x.id,
          name:x.name,
          description:x.description,
          status:x.status,
          useDate:x.useDate
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = items.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  save(item){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(item));
        let found = items.filter(x => x.id == item.id)[0];

        if(found){
          let index = items.indexOf(found);
          items[index] = instance;
        }else{
          instance.id = getId();
          items.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
