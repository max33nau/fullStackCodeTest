'use strict';
export default function( ngModule ) {
	ngModule.provider( 'Image',  function(){
		var API_URL;
		this.setUrl = function(url) {
			API_URL = url;
		};
		this.$get = function( $http,$cacheFactory ) {
    return {
      getAll(){
        return $http({
          url: API_URL + '/image',
          method: 'GET',
        });
      },
      create(newImage) {
        return  $http({
          url: API_URL+'/image',
          method: 'POST',
          data: newImage
        });
      },
      delete(image) {
        return $http({
          url: API_URL+'/image/'+image._id,
          method: 'DELETE'
        });
      }
		};
	};
});
}
