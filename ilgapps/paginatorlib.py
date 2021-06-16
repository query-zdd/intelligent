# -*- coding: utf-8 -*-
from django.core.paginator import Paginator,InvalidPage,EmptyPage

class PageConf(object):
    def __init__(self,data,page,step = 5):
        self.data = data
        self.page = page
        self.step = step
        self.postdata = self.proPaginator()

    def getIndexRange(self):
        min = int(self.step) * (int(self.page) - 1) + 1
        max = int(self.step) * (int(self.page) - 1) + len(self.postdata.object_list)
        return min, max

    def getData(self):
        return self.postdata

    def proPaginator(self):
        self.paginator = Paginator(self.data, self.step)
        try:
            return self.paginator.page(self.page)
        except:
            self.page = 1
            return self.paginator.page(1)

    def getPageList(self):
        ###分页页码预处理start######
        page_num_list = []
        more_page = 0
        for i in range(-2,3):
            if self.postdata.number + i > 0 and self.postdata.number + i <= self.postdata.paginator.num_pages:
                if i == 0:
                    page_num_list.append((self.postdata.number + i,True))
                else:
                    page_num_list.append((self.postdata.number + i,False))
            else:
                more_page += int(-i/abs(i))
        if more_page > 0 :
            for _ in range(0,more_page):
                if page_num_list[-1][0] + 1 <= self.postdata.paginator.num_pages:
                    page_num_list.append((page_num_list[-1][0] + 1,False))
        elif more_page < 0:
            for _ in range(more_page,0):
                if page_num_list[0][0] - 1 > 0:
                    page_num_list.insert(0,(page_num_list[0][0] - 1,False))
        ###分页页码预处理end######
        return page_num_list
