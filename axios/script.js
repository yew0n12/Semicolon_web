async function dummy(){
	try{
		const res = await axios({
		method: "",
    url: "",
    headers: {},
    data: {},
		});

		console.log(res);
	} catch(err){
		console.error(err);	
}}