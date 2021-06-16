import cv2
import time

def getTime():
    return time.strftime("%Y%m%d%H%M%S", time.localtime())

if __name__ == "__main__":
    cap = cv2.VideoCapture("/home/msh/PycharmProjects/intelligent/ilgapps/static/video/demo.avi")
    print(cap.isOpened())
    # 摄像头fps=25 逐帧读取，即每秒25张
    while 1:
        ret, frame = cap.read()  # 读取
        cv2.imshow("capture", frame) # 显示
        if cv2.waitKey(100) & 0xff == ord('q'): # 按q退出
            cap.release()
            cv2.destroyAllWindows()
            break