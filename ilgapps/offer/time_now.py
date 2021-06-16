import time
import datetime


def current_time(time_options, interval_day):
    """

    :param time_options: time_options == "add_time":增加时间，time_options == "sub_time":减去时间
    :param interval_day: 间隔天数
    :return: 当前日期0点0分
    """
    day_time = int(time.mktime(datetime.date.today().timetuple()))
    if time_options == "add_time":
        interval_seconds = interval_day * 86400
        date = datetime.datetime.fromtimestamp(day_time + interval_seconds)
        return date
    elif time_options == "sub_time":
        interval_seconds = interval_day * 86400
        date = datetime.datetime.fromtimestamp(day_time - interval_seconds)
        return date
    else:
        print(f"参数错误：{time_options}，请检查")


if __name__ == '__main__':
    a = current_time("sub_time", 0)
    for i in range(1,8,1):

        num = 7 + i * (-1)
        a = current_time("sub_time", num-1)
        print(a)
        print(num)