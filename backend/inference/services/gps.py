from dataclasses import dataclass
import exifread as ef

@dataclass(frozen=True)
class Coordinates:
    latitude: float
    longitude: float

def extract_coordinates(filepath: str) -> Coordinates | None:
    """
    Returns gps data if present otherwise None
    """

    # https://gist.github.com/snakeye/fdc372dbf11370fe29eb
    def _convert_to_degress(value):
        """
        Helper function to convert the GPS coordinates stored in the EXIF to degress in float format
        :param value:
        :type value: exifread.utils.Ratio
        :rtype: float
        """
        d = float(value.values[0].num) / float(value.values[0].den)
        m = float(value.values[1].num) / float(value.values[1].den)
        s = float(value.values[2].num) / float(value.values[2].den)

        return d + (m / 60.0) + (s / 3600.0)

    with open(filepath, "rb") as f:
        tags = ef.process_file(f)
        latitude = tags.get("GPS GPSLatitude")
        latitude_ref = tags.get("GPS GPSLatitudeRef")
        longitude = tags.get("GPS GPSLongitude")
        longitude_ref = tags.get("GPS GPSLongitudeRef")
        if latitude:
            lat_value = _convert_to_degress(latitude)
            if latitude_ref.values != "N":
                lat_value = -lat_value
        else:
            return None
        if longitude:
            lon_value = _convert_to_degress(longitude)
            if longitude_ref.values != "E":
                lon_value = -lon_value
        else:
            return None
        return Coordinates(latitude=lat_value, longitude=lon_value)
    return None
