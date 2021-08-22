import { rsiIndicator } from '../index'

describe('RsiIndicator', () => {
  const testPrices = [94.449997, 94.769997, 95.410004, 94.980003, 94.519997, 93.809998, 94.199997, 94.889999, 94.68, 95.370003, 95.199997, 95.32, 95.599998, 95.839996, 95.599998, 96.400002, 97, 99.349998, 98.849998, 100.139999, 100.099998, 100.099998, 98.68, 98.639999, 100.860001, 100.239998, 101.440002, 103, 103, 103.099998, 103.839996, 103.639999, 102.5, 101.879997, 98.379997, 99.699997, 99.669998, 99.389999, 99.760002, 99.470001, 99.370003, 100.480003, 101.839996, 114.620003, 115.040001, 114.339996, 115, 114.580002, 113.099998, 113.660004, 112.5, 110.059998, 111.099998, 110.080002, 110.239998, 109.900002, 111.919998, 112.959999, 116.080002, 114.599998, 111.900002, 113.760002, 115.68, 113.18, 113.620003, 113.720001, 113.160004, 111.199997, 112, 110.419998, 111.220001, 111.139999, 111.959999, 111.379997, 113.720001, 113.18, 113.32, 114.440002, 113.540001, 114.620003, 118.160004, 116.980003, 118.720001, 118.5, 118.82, 118.459999, 118.5, 118, 120.760002, 122.260002, 123.5, 124.379997, 123.760002, 122.82, 123.199997, 123, 121.900002, 121.919998, 121.059998, 121.419998, 120.980003, 120.059998, 113.32, 112, 111.239998, 112.459999, 113.779999, 112.220001, 114.099998, 113.419998, 110.580002, 111.720001, 113.18, 109.360001, 106.18, 104, 106.199997, 108.660004, 106.080002, 106.339996, 107.620003, 105.480003, 105.739998, 107.300003, 107.980003, 106.860001, 109.860001, 107.480003, 106.379997, 106.720001, 108.540001, 107.120003, 108.379997, 108.599998, 108.360001, 108.300003, 109.220001, 111.480003, 111.300003, 110.199997, 108.739998, 109.139999, 109.339996, 107.879997, 106.480003, 108.260002, 108.5, 109.099998, 109.860001, 108.120003, 108.379997, 106.699997, 107.5, 107.800003, 107.879997, 106.860001, 103.339996, 104.839996, 104.279999, 103.660004, 105.900002, 104.940002, 115.68, 114.760002, 115.480003, 116.639999, 116, 115.82, 118.739998, 119.5, 118.459999, 118.879997, 119.220001, 119.699997, 118.900002, 119.400002, 118.800003, 119.620003, 120.82, 120.360001, 122.080002, 122.699997, 123.260002, 123.540001, 123.339996, 122.120003, 121.559998, 122.599998, 122.059998, 122.660004, 122.260002, 122.360001, 122.800003, 123.360001, 122.400002, 123.040001, 122.519997, 123.480003, 119.440002, 120.160004, 122.080002, 121.239998, 122.199997, 121.940002, 121.739998, 121.400002, 122.120003, 124.160004, 124.720001, 120.559998, 119.580002, 119.559998, 120.940002, 120.760002, 121.400002, 120.32, 122, 120.459999, 119.559998, 120.099998, 120.82, 123.160004, 123.760002, 123.760002, 123.599998, 123, 122.440002, 125.959999, 125.660004, 126.199997, 126.599998, 123.839996, 126.900002, 122.459999, 119.839996, 120, 118.18, 117.82, 120, 122.980003, 124.599998, 124.419998, 124.080002, 123.660004, 125.360001, 126.82, 126.800003, 127.139999, 127.400002, 127.32, 129.440002, 127.800003, 126.160004, 121.239998, 119.279999, 118.760002, 115.540001, 111.559998, 111, 112.940002, 111.5, 110.239998, 107.519997, 98.940002, 100.660004, 100.639999, 90.900002, 92.669998, 89.760002, 92.360001, 89.07, 87.629997, 91.260002, 92.139999, 99.32, 99, 103.959999, 99.870003, 102.18, 102.800003, 98.099998, 97.230003, 97.349998, 101.400002, 103.68, 105, 110, 112, 108.300003, 110.099998, 113.059998, 113.739998, 106.279999, 108.239998, 108.120003, 106.68, 107.800003, 108.839996, 109.800003, 108.940002, 106.879997, 108.440002, 105.300003, 107.339996, 107.739998, 106.639999, 106.860001, 106, 103.900002, 103.739998, 107.360001, 108.080002, 110.199997, 106.779999, 106.379997, 111.599998, 110.980003, 111.839996, 112.599998, 113.5, 115.940002, 119.040001, 119.599998, 121.139999, 120.220001, 120.68, 120.459999, 116.379997, 115.300003, 114.360001, 118.82, 120.239998, 120.400002, 123.480003, 124.019997, 125.5, 120.099998, 120.800003, 122.120003, 122.440002, 124.32, 123.860001, 127.660004, 127.580002, 130.720001, 128.779999, 128.779999, 134.679993, 135.039993, 137.520004, 133.940002, 137.339996, 135.460007, 135.899994, 139.240005, 141.860001, 142.240005, 141.259995, 135.639999, 139.300003, 137.759995, 139.559998, 133.520004, 133.779999, 137.539993, 135.320007, 136, 135.240005, 137.220001, 134.940002, 137.100006, 138.080002, 137.119995, 135.240005, 135.660004, 135.320007, 136.839996, 136.539993, 135.800003, 138.600006, 139.259995, 142.259995, 140.360001, 139.759995, 138.039993, 138.639999, 141.5, 137.320007, 132.860001, 136.820007, 133.440002, 137.520004, 136.020004, 135.5, 135.559998, 135.279999, 135.960007, 135.520004, 135.5, 131, 132.5, 132, 131.960007, 129.960007, 134.660004, 134.160004, 132.759995, 133.740005, 132.759995, 132.399994, 131.460007, 130.380005, 132.339996, 133.059998, 134.380005, 134.080002, 134.320007, 130.559998, 132.839996, 131, 127.540001, 124.919998, 124.5, 124.900002, 97.5, 96.949997, 92.239998, 93.260002, 91.489998, 90.18, 93.949997, 96.75, 98.209999, 97.25, 98.970001, 99.089996, 101.519997, 100.279999, 101.220001, 100.279999, 98.529999, 100, 99.419998, 98.800003, 98.279999, 97.349998, 98.68, 99.540001, 100.139999, 101.980003, 101.220001, 101.300003, 100.900002, 102.779999, 101.720001, 102.080002, 102.080002, 101.18, 99.75, 99.93, 100.68, 102.800003, 105, 104.260002, 101.459999, 103.620003, 103.760002, 105.260002, 106.800003, 107.220001, 105.32, 105.040001, 105.480003, 104.519997, 106.18, 106.040001, 105.739998, 105.360001, 104.199997, 103.519997, 103.239998, 103.900002, 104.860001, 104.919998, 104.699997, 105.519997, 109.980003, 109.639999, 108.300003, 104.800003, 107.040001, 108.260002, 108.760002, 110.279999, 108.480003, 108.959999, 108.879997, 107.279999, 109.5, 108.559998, 108.839996, 108.339996, 104.419998, 106.239998, 104.940002, 103.900002, 102.900002, 103.220001, 102.720001, 102.059998, 103.360001, 103.5, 103.099998, 102.68, 101.779999, 104.660004, 106, 105.82, 105.860001, 103.040001, 102.660004, 103.019997, 103, 102.760002, 103.599998, 103.5, 103.059998, 102.82, 102.459999, 102.879997, 104.300003, 103.559998, 104.419998, 106.779999, 108.900002, 109.360001, 111.099998, 112.300003, 111.239998, 112.160004, 113.400002, 115.68, 116.220001, 116.040001, 115.339996, 116.699997, 120.699997, 119.419998, 118.519997, 118.040001, 118.760002, 118.040001, 116.760002, 116.620003, 112.739998, 115.839996, 116.419998, 117.360001, 115.599998, 113.260002, 112.559998, 112.160004, 114.040001, 112.980003, 113.440002, 112.099998, 115, 114.879997, 115.080002, 116.019997, 113.919998, 115.120003, 113.519997, 113.919998, 114.120003, 113.5, 114.800003, 115.599998, 116, 115.059998, 116.040001, 118.339996, 119.919998, 120.260002, 118.82, 119.360001, 118.199997, 118.059998, 118.080002, 116.580002, 118.660004, 117.68, 118.5, 119.739998, 118.839996, 118.400002, 119.300003, 118.900002, 120.300003, 124.5, 123.18, 124.720001, 125.779999]

  describe('calculate', () => {
    it('should return the correct trading suggestion for the given array of prices', () => {
      expect(rsiIndicator.calculateTradingSuggestion(testPrices)).toEqual('LONG')
      expect(rsiIndicator.calculateTradingSuggestion([...testPrices, 110])).toEqual('SHORT')
    })
  })

  describe('calculateRSITradeSuggestion', () => {
    it('should return the correct rsi for the given array of prices', () => {
      const rsi = rsiIndicator.calculateValues(testPrices)

      expect(rsi).toEqual([60.29, 65.59, 68.94, 77.98, 73.11, 77.09, 76.71, 76.71, 63.79, 63.47, 71.98, 67.26, 71.2, 75.34, 75.34, 75.6, 77.5, 75.79, 66.72, 62.35, 44.59, 50.33, 50.21, 48.96, 50.7, 49.28, 48.78, 54.38, 60.14, 82.5, 82.84, 80.04, 80.7, 78.91, 72.78, 73.61, 68.9, 60.16, 62.35, 58.93, 59.31, 58.08, 62.96, 65.21, 70.91, 65.43, 56.81, 60.66, 64.2, 57, 57.9, 58.11, 56.39, 50.72, 52.8, 48.44, 50.67, 50.43, 52.84, 50.95, 57.53, 55.67, 56.07, 59.21, 55.76, 58.85, 67, 62.55, 66.12, 65.28, 65.96, 64.42, 64.52, 62.2, 68.87, 71.78, 73.95, 75.4, 72.35, 67.87, 68.72, 67.71, 62.3, 62.36, 58.15, 59.38, 57.16, 52.72, 32.69, 30.27, 28.94, 33.96, 38.98, 35.54, 42.16, 40.54, 34.56, 38.48, 43.18, 35.53, 30.66, 27.85, 34.4, 40.86, 36.77, 37.45, 40.82, 37.21, 37.93, 42.2, 44.01, 41.7, 49.38, 44.38, 42.26, 43.16, 47.88, 44.76, 48, 48.57, 47.95, 47.79, 50.56, 56.65, 56.06, 52.45, 48.03, 49.29, 49.95, 45.35, 41.41, 47.64, 48.43, 50.46, 52.98, 47.07, 48.01, 42.76, 45.8, 46.94, 47.25, 43.66, 34.05, 40.1, 38.68, 37.1, 45.7, 42.99, 66.76, 64.28, 65.36, 67.09, 65.16, 64.6, 69.24, 70.33, 66.84, 67.54, 68.13, 68.98, 65.82, 66.84, 64.35, 66.2, 68.76, 66.68, 70.3, 71.51, 72.59, 73.14, 72.03, 65.5, 62.7, 65.64, 62.87, 64.66, 62.49, 62.83, 64.34, 66.21, 60.35, 62.72, 59.6, 63.24, 44.92, 47.82, 54.68, 51.49, 54.74, 53.69, 52.85, 51.38, 54.28, 61.31, 63, 46.73, 43.86, 43.8, 48.92, 48.3, 50.69, 46.77, 52.88, 47.49, 44.64, 46.71, 49.43, 57.09, 58.81, 58.81, 58.09, 55.35, 52.84, 63.91, 62.56, 64.03, 65.12, 53.13, 61.58, 48.05, 42.16, 42.62, 38.82, 38.1, 44.81, 52.4, 55.95, 55.46, 54.48, 53.23, 57.48, 60.78, 60.72, 61.52, 62.16, 61.82, 66.98, 60.2, 54.29, 41.21, 37.34, 36.37, 30.98, 25.88, 25.25, 31.48, 29.51, 27.87, 24.68, 17.78, 22.46, 22.45, 16.34, 20.57, 18.88, 24.82, 22.57, 21.64, 29.5, 31.29, 43.87, 43.49, 50.66, 45.53, 48.69, 49.54, 43.66, 42.65, 42.84, 49.17, 52.36, 54.16, 60.27, 62.43, 56.33, 58.46, 61.75, 62.49, 50.91, 53.36, 53.18, 51.02, 52.63, 54.14, 55.55, 53.95, 50.23, 52.88, 47.4, 50.96, 51.65, 49.58, 50.01, 48.28, 44.24, 43.94, 51.92, 53.34, 57.35, 49.91, 49.11, 58.49, 57.14, 58.56, 59.84, 61.35, 65.18, 69.33, 70.03, 71.92, 69.12, 69.75, 69.02, 57.09, 54.41, 52.11, 60.6, 62.86, 63.12, 67.73, 68.48, 70.49, 56.36, 57.55, 59.77, 60.31, 63.44, 62.15, 67.94, 67.7, 71.82, 66.21, 66.21, 73.51, 73.88, 76.34, 66.6, 70.45, 65.92, 66.46, 70.33, 72.97, 73.34, 70.65, 57.62, 62.48, 59.39, 61.77, 50.99, 51.39, 56.79, 53.04, 54.04, 52.69, 55.79, 51.6, 55.04, 56.56, 54.62, 50.94, 51.72, 51.01, 54.05, 53.34, 51.56, 57.36, 58.62, 63.84, 58.78, 57.24, 52.95, 54.24, 59.88, 50.15, 42.26, 49.81, 44.47, 51.26, 48.89, 48.07, 48.17, 47.67, 49.06, 48.17, 48.13, 39.58, 43.2, 42.29, 42.22, 38.47, 49.76, 48.74, 45.89, 48.17, 46.08, 45.3, 43.24, 40.94, 46.5, 48.42, 51.84, 51.01, 51.68, 42.06, 48.34, 44.18, 37.62, 33.56, 32.94, 34.18, 14.49, 14.31, 12.85, 14.87, 14.26, 13.8, 21.59, 26.88, 29.55, 28.8, 32.1, 32.34, 37.1, 35.72, 37.61, 36.46, 34.34, 37.62, 36.83, 35.97, 35.23, 33.88, 37.56, 39.89, 41.53, 46.37, 44.72, 44.94, 43.99, 49.4, 46.67, 47.72, 47.72, 45.13, 41.28, 41.95, 44.78, 51.91, 57.98, 55.45, 47.07, 52.97, 53.33, 57.15, 60.71, 61.64, 55.24, 54.34, 55.56, 52.28, 57.01, 56.5, 55.36, 53.88, 49.52, 47.12, 46.12, 48.86, 52.63, 52.86, 51.85, 55.29, 68.46, 66.84, 60.75, 48.36, 54.73, 57.78, 59, 62.54, 56.33, 57.54, 57.26, 51.74, 57.82, 54.68, 55.45, 53.69, 42.31, 47.83, 44.55, 42.06, 39.76, 40.88, 39.64, 38.01, 42.99, 43.51, 42.31, 41.03, 38.35, 49.67, 53.91, 53.26, 53.4, 43.84, 42.72, 44.17, 44.1, 43.26, 47.07, 46.66, 44.85, 43.85, 42.33, 44.74, 52.05, 48.45, 52.56, 61.59, 67.57, 68.7, 72.62, 74.94, 69.34, 71.34, 73.82, 77.66, 78.46, 77.46, 73.53, 76.07, 81.65, 75.58, 71.55, 69.42, 70.82, 67.5, 61.93, 61.33, 47.64, 56.08, 57.46, 59.67, 54.01, 47.54, 45.78, 44.76, 50.37, 47.44, 48.83, 45.09, 53.41, 53.05, 53.61, 56.24, 49.48, 52.96, 48.2, 49.42, 50.06, 48.04, 52.37, 54.87, 56.1, 52.46, 55.69, 62.18, 65.88, 66.64, 60.52, 61.93, 57.2, 56.64, 56.7, 50.54, 57.45, 53.65, 56.26, 59.93, 56.24, 54.47, 57.42, 55.69, 60.2, 70.04, 64.63, 67.76, 69.74])
    })
  })
})
