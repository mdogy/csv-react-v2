function csv2data(csv_text){
    let data = csv_text.match(/[^\r\n]+/g);
    let column_names = data[0].split(',');
    column_names[0]='id';
    data = data.slice(1);
    const filtered_data = data.filter(
      datarow=> (datarow.length>1)
      );
     const rows = filtered_data.map( datarow => {
        let row ={};
        column_names.forEach( 
            (key, i) => {
              let item = datarow.split(',')[i];
              // Get rid of extra " mark
              item=item.replace(/"/g,'');
              row[key]=item;
            }
          )
  
        return row;
      });
    return rows;
  }

  export default csv2data;