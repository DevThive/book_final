import { Injectable } from '@nestjs/common';
import { Point } from 'wkx';
import { StoreService } from '../store/store.service';

@Injectable()
export class MapService {
  constructor(private readonly storeService: StoreService) {}
  async findNearCafe(location: string) {
    const radiusNo = 10; //반경 10km 이내 점포 반환
    const storeList = await this.storeService.storelist();
    const nearCafe = [];
    const locationNum = [];
    const newLocation = location.split('!').map((x) => x.trim());
    newLocation.forEach((element) => {
      locationNum.push(parseFloat(element));
    });
    // 모든 점포를 일일히 대조하는 비효율적인 로직.. 개선점 질문 필요
    storeList.forEach((element) => {
      console.log(this.getDistance(locationNum, element.place));
      if (radiusNo >= this.getDistance(locationNum, element.place)) {
        nearCafe.push(element);
      }
    });
    return JSON.stringify(nearCafe);
  }

  async findNearCafeSearch(location: string, keyword: string) {
    const nearCafe = JSON.parse(await this.findNearCafe(location));
    const haveCafe = [];
    nearCafe.forEach(async (cafe) => {
      const bookList = await cafe.storebook; //보유 도서 불러오기
      let check = 0;
      //보유 도서에 키워드 존재하는지 여부 검색
      bookList.foreach((book) => {
        if (book.includes(keyword)) check = 1;
      });
      if (check === 1) haveCafe.push(cafe);
    });

    return JSON.stringify(haveCafe);
  }

  deg2rad(deg: number) {
    return (deg * Math.PI) / 180.0;
  }

  getDistance(point1: number[], point2: Point) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(point2[0] - point1[0]);
    const dLon = this.deg2rad(point2[1] - point1[1]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(point1[0])) *
        Math.cos(this.deg2rad(point2[0])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
