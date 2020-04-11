$(document).ready(function(){

	$("#form").on('submit',async function(e){
		e.preventDefault();
		let latitude;
		let long_latitude;
		const data = new FormData(this);
		await navigator.geolocation.getCurrentPosition(async function(cor){
			latitude       = cor.coords.latitude;
			long_latitude  = cor.coords.longitude;
			const hasil = await distance(latitude,
				                         long_latitude,
				                         data.get('latitude_destinasi'),
				                         data.get('long_latitude_destinasi'),"K")
			if (hasil) {
				$(".result").html(`<div class="alert alert-success">Memiliki Jarak ${hasil} Km</div>`)
			}
		})

	})


    // menghitung jarak antar lokasi
	function distance(lat1, lon1, lat2, lon2, unit) {
		if ((lat1 == lat2) && (lon1 == lon2)) {
			return 0;
		}
		else {
			var radlat1 = Math.PI * lat1/180;
			var radlat2 = Math.PI * lat2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI * theta/180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit=="K") { dist = dist * 1.609344 }
			if (unit=="N") { dist = dist * 0.8684 }
			return dist.toFixed(2);
		}
	}

	


})