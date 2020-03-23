
class DistanceCalculator {

  constructor(lat, lng) {
    this.startLatitude = lat;
    this.startLongitude = lng;
  }

  /* Location-Based Context-Aware Recommender Algorithm */
  locationBasedLiftRecommenderAlgorithm(possibleCandidates, searchRadius) {
    let candidates = [];
    for (var i = 0 ; i < possibleCandidates.length; i++) {
      try {
        let distance = this.calculateHaversineDistance(possibleCandidates[i].targetlatitude, possibleCandidates[i].targetlongitude);
        if (distance <= searchRadius) candidates.push(possibleCandidates[i]);
      } catch (error) {
        throw error;
      }
    }
    return candidates;
  }

  /* Calculates the distance between two points on the earth through the Haversine Formula */
  calculateHaversineDistance(lat, lng) {
    let earthRadius = 6371; // in km
    let deltaLatitude = this.convertToRadian(lat - this.startLatitude);
    let deltaLongitude = this.convertToRadian(lng - this.startLongitude);
    let haversineLatitude = Math.pow(Math.sin(deltaLatitude / 2), 2);
    let haversineLongitude = Math.pow(Math.sin(deltaLongitude / 2), 2);
    let h = haversineLatitude + Math.cos(this.convertToRadian(this.startLongitude)) * Math.cos(this.convertToRadian(lat)) * haversineLongitude;
    if (h >= 0 && h <= 1) {
      let distance = 2 * earthRadius * Math.asin(Math.sqrt(h));
      return distance;
    } else {
      throw new Error("Failed to Calculate the Haversine Distance, because h not between 0 and 1.");
    }
  }

  /* Calculates the distance between two points on the earth through the Vincenty Formula */
  /* For Formula Notation Informations look Vincenty Paper */
  calculateVincentyDistance(lat, lng) {
    // Set Longitudes, Latitudes in Notation Form of Vincenty
    let phi1 = this.convertToRadian(this.startLatitude);
    let phi2 = this.convertToRadian(lat);
    let L1 = this.convertToRadian(this.startLongitude);
    let L2 = this.convertToRadian(lng);

    // Set Constants in Vincenty Formula
    let a = 6378137 // meters in WGS-84
    let f = 1 / 298.257223563; // in WGS-84
    let b = (1 - f) * a; // in WGS-84
    let accuracy = 1e-12; // accuracy which determines when changes of lambda are negligible

    // Inverse Vincenty Formula
    let U1 = Math.atan((1 - f) * Math.tan(phi1));
    let U2 = Math.atan((1 - f) * Math.tan(phi2));
    let L = L2 - L1;
    let lambda = L; // Initial Value of lambda
    let prevLambda;
    let limit = 20; // maximum number of iterations
    // Iterate following Equations until change in lambda is negligible
    do {
      var sinsigma = Math.sqrt(Math.pow(Math.cos(U2) * Math.sin(lambda), 2) + Math.pow(Math.cos(U1) * Math.sin(U2) - Math.sin(U1) * Math.cos(U2) * Math.cos(lambda), 2));
      if (sinsigma == 0) return 0;
      var cossigma = Math.sin(U1) * Math.sin(U2) + Math.cos(U1) * Math.cos(U2) * Math.cos(lambda);
      var tanphi = sinsigma / cossigma;
      var sinalpha = Math.cos(U1) * Math.cos(U2) * Math.sin(lambda) / sinsigma;
      var cos2alpha = 1 - Math.pow(sinalpha, 2);
      var cos2Xsigmam = cossigma - 2 * Math.sin(U1) * Math.sin(U2) / cos2alpha;
      if (isNaN(cos2Xsigmam)) cos2Xsigmam = 0;
      prevLambda = lambda;
      var C = f / 16 * cos2alpha * (4 + f * (4 - 3 * cos2alpha));
      var sigma = Math.atan2(sinsigma, cossigma);
      lambda = L + (1 - C) * f * sinalpha * (sigma + C * sinsigma * (cos2Xsigmam + C * cossigma * (-1 + 2 * Math.pow(cos2Xsigmam, 2))));
    } while (Math.abs(lambda - prevLambda) > accuracy && --limit > 0);
    if (limit == 0) throw new Error("Failed to calculate Vincenty Distance, because Formula could not converge.");
    // Evaluate the following
    var uXu = cos2alpha * (a * a - b * b) / (b * b);
    var A = 1 + uXu / 16384 * (4096 + uXu * (-768 + uXu * (320 - 175 * uXu)));
    var B = uXu / 1024 * (256 + uXu * (-128 + uXu * (74 - 47 * uXu)));
    var deltasigma = B * sinsigma * (cos2Xsigmam + B / 4 * (cossigma * (-1 + 2 * Math.pow(cos2Xsigmam, 2)) - B / 6 * cos2Xsigmam * (-3 + 4 * Math.pow(sinsigma, 2)) * (-3 + 4 * Math.pow(cos2Xsigmam, 2))));
    var s = b * A * (sigma - deltasigma);
    s = s.toFixed(3);
    return s / 1000;
  }

  /* Converts a given value in degrees to a value in radian format */
  convertToRadian(value) {
    return value * (Math.PI / 180);
  }
}

module.exports = DistanceCalculator;