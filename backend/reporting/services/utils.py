from math import floor


# Helper function for converting decimal degrees to DMS (source: http://rextester.com/BRMA94677)
def dd2dms(decimaldegree: float, direction="x") -> str:
    """Format a coodinate (latitude or longitude) from decimal (dd) to degrees-minutes-seconds (dms)"""
    if type(decimaldegree) != "float":
        try:
            decimaldegree = float(decimaldegree)
        except:
            # print("\nERROR: Could not convert %s to float." % (type(decimaldegree)))
            raise ValueError(f"Could not convert {type(decimaldegree)} to float.")
    if decimaldegree < 0:
        decimaldegree = -decimaldegree
        if direction == "x":
            appendix = "W"
        else:
            appendix = "S"
    else:
        if direction == "x":
            appendix = "E"
        else:
            appendix = "N"
    minutes = decimaldegree % 1.0 * 60
    seconds = minutes % 1.0 * 60

    return "{0}°{1}'{2:2.3f}\"{3}".format(
        int(floor(decimaldegree)), int(floor(minutes)), seconds, appendix
    )
