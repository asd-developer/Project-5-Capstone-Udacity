jest.mock('./app.js')

test('should return value', () => {
    const func = async function sendWeatherInformation(placeInfo) {
        expect().toBeThruthy();
    }
});


test('should return value', () => {
    const func = async function searchPlace() {
        const searchResults = 'dinossaur';
        expect(searchPlace()).toBe(searchResult);
    }
});

test('should return value', () => {
    const func = async function getWeatherData() {
        const weatherDataResult = 'dinossaur';
        expect(getWeatherData()).toBe(weatherDataResult);
    }
});
