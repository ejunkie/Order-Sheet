
function doPost(e){
 
  var ss= SpreadsheetApp.openById("REPLACE_WITH_YOUR_SHEET_ID");
  var sheet = ss.getSheetByName("Orders"); 

  var outputArray = [];
 
  if(typeof e !== 'undefined') {
    Logger.log(e.parameter)
    var data = e.parameter;
        var arr = [];
    for(var k in data){
      arr[k] = data[k]
    }

    /*
    A => 1 => Txn ID
    B => 2 => Amount
    C => 3 => Order Date
    D => 4 => Buyer Details
    E => 5 => Buyer Email
    F => 6 => Buyer Phone
    G => 7 => Shipping Details
    H => 8 => Order Type
    I => 9 => Shipping
    J => 10 => Tax
    K => 11 => Invoice
    L => 12 => Discount Codes
    M => 13 => External Txn Id
    N => 14 => Payment Status
    O => 15 => Payment Date
    P => 16 => Cash Paid
    Q => 17 => Delivery Status
    R => 18 => Tracking ID
    S => 19 => Dispatch Date
    T => 20 => Shipping Cost
    U => 21 => Tracking Mail
    V => 22 => Tracking Mail Text
    W => 23 => Remarks
    X => 24 => Order Details
    Y => 25 => Quantity
    Z => 26 => Amount
    AA => 27 => Options
    AB => 28 => Print
    */
    
    outputArray.push(data.ej_txn_id) //A
    outputArray.push(data.mc_gross) //B
    var d = new Date().toLocaleString()
    outputArray.push(d) //C
    
    var str = ""
    str += data.first_name ? data.first_name + "\n" : ""
    str += data.last_name ? data.last_name : ""
    //str += data.payer_business_name ? data.payer_business_name + "\n" : ""
    outputArray.push(str.trim()) //D
    
    data.payer_email ? outputArray.push(data.payer_email) : outputArray.push("") //E
    data.payer_phone ? outputArray.push(data.payer_phone) : outputArray.push("") //F
    
    var str = ""
    str += data.address_name ? data.address_name +"\n" : ""
    str += data.address_business_name ? data.address_business_name +"\n" : ""
    str += data.address_phone ? data.address_phone +"\n" : ""
    str += data.address_street ? data.address_street +"\n" : ""
    str += data.address_city ? data.address_city +"\n" : ""
    str += data.address_state ? data.address_state +"\n" : ""
    str += data.address_zip ? data.address_zip +"\n" : ""
    str += data.address_country_code ? data.address_country_code +"\n" : ""
    str += data.address_country ? data.address_country +"\n" : ""
    outputArray.push(str.trim()) //G
    
    var contact_address = str.trim()
    
    outputArray.push(data.txn_type.toUpperCase()) //H
    outputArray.push(data.mc_shipping) //I
    outputArray.push(data.tax) //J
    outputArray.push(data.invoice) //K
    outputArray.push(data.discount_codes) //L
    outputArray.push(data.txn_id) //M

    if(data.txn_type == "cash") //N
      outputArray.push("Pending")
    else
      outputArray.push(data.payment_status)
    
    if(data.txn_type == "cash") //O
      outputArray.push("")
    else
      outputArray.push(data.payment_date)
    
    if(data.txn_type == "cash") //P
      outputArray.push("")
    else
      outputArray.push(0)
      
    outputArray.push("Pending") //Q
    outputArray.push("") //R
    outputArray.push("") //S
    outputArray.push("") //T
    outputArray.push("No") //U
    outputArray.push("") //V
    outputArray.push("") //W

    sheet.appendRow(outputArray);
    
    //Start Inserting Order Details into new rows
    if(data.num_cart_items == 1){
      var outputArray = [];
      outputArray.push(data.ej_txn_id)
      for(var i = 2; i <= 23; i++)
      {
        outputArray.push('');
      }
      var str = ""
      str += arr['item_name1'] ? arr['item_name1']+", " : ''
      str += arr['item_number1'] ? arr['item_number1']+"\n" : "\n"
      outputArray.push(str.trim())

      var str = ""
      str += arr['quantity1'] ? arr['quantity1'] : ''
      outputArray.push(str.trim())

      var str = ""      
      str += arr['mc_gross_1'] ? "Rs. "+arr['mc_gross_1']+"\n" : ''
      outputArray.push(str.trim())

      var str = ""      
      str += arr['option_name1'] ? arr['option_name1'] : ''
      str += arr['option_selection1'] ? " - "+arr['option_selection1']+"\n" : ""
      str += arr['option_name2'] ? arr['option_name2'] : ''
      str += arr['option_selection2'] ? " - "+ arr['option_selection2']+"\n" : ""
      str += arr['option_name3'] ? arr['option_name3'] : ''
      str += arr['option_selection3'] ? " - "+ arr['option_selection3'] : ""
      outputArray.push(str.trim())

      sheet.appendRow(outputArray);

    }else{
      for(var i = 1; i <= data.num_cart_items; i++){

        var outputArray = [];
        outputArray.push(data.ej_txn_id)
        for(var z = 2; z <= 23; z++)
        {
          outputArray.push('');
        }

        var str = ""
        str += arr['item_name' + i] ? arr['item_name' + i]+", " : ""  
        str += arr['item_number' + i] ? arr['item_number' + i]+"\n" : "\n" 
        outputArray.push(str.trim())        

        var str = ""
        str += arr['quantity' + i] ? arr['quantity' + i] : "" 
        outputArray.push(str.trim())

        var str = ""
        str += arr['mc_gross_' + i] ? "Rs. "+arr['mc_gross_' + i]+"\n" : "\n"
        outputArray.push(str.trim())

        var str = ""
        str += arr['option_name1_' + i] ? arr['option_name1_' + i]+" - ": ""
        str += arr['option_selection1_' + i] ? arr['option_selection1_' + i]+"\n" : "\n" 
        str += arr['option_name2_' + i] ? arr['option_name2_' + i]+" - " : ""
        str += arr['option_selection2_' + i] ? arr['option_selection2_' + i]+"\n" : "\n" 
        str += arr['option_name3_' + i] ? arr['option_name3_' + i]+" - " : "" 
        str += arr['option_selection3_' + i] ? arr['option_selection3_' + i] : ""
        outputArray.push(str.trim())

        sheet.appendRow(outputArray);
    
      }
    }
    
    // optional code, if you want to add the buyer to your google contacts
    var contact_f_name = data.first_name ? data.first_name : ""
    var contact_l_name = data.last_name ? data.last_name : ""
    var contact_email = data.payer_email ? data.payer_email : ""
    var contact_phone = data.payer_phone ? data.payer_phone : ""
    
    var x = ContactsApp.createContact(contact_f_name, contact_l_name, contact_email);
    x.setMobilePhone(contact_phone)
    x.setAddress(contact_address)
    
  } else {
    
    Logger.log("no post data");
  
    return;
}
