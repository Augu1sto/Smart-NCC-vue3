export default {
	error:'',
	parse2JSON : function (url){
		let params = url.split("?")[1].split("&");
		let data = {};
		params.forEach((item) => {
			let key = item.split('=')[0];
			let value = item.split('=')[1];
			data[key] = value;
		});
        return data;
	}
}