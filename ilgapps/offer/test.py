import os
def run_rcnn():
    cmd_q = "python ../faster-rcnn.pytorch/demo.py --net res101 --checksession 1 --checkepoch 20 --checkpoint 323 --cuda --load_dir models"
    d=os.system(cmd_q)
    int(d)