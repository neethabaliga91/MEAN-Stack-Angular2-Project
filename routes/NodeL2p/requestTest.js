var auth = require("./l2pAuth");
auth.setClientID('Se8Uit5Hd244cltskaVUpHFVXaZ6exvKVTKsKhKTH70yTlPlWoHHUR5RFsy30nV.app.rwth-aachen.de')
auth.obtainUserCode(function(response){console.log(response)})