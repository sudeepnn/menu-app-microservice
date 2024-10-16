import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}


  create(createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuRepository.save(createMenuDto);
  }

  async findAll(): Promise<Menu[]> {
    return  this.menuRepository.find();
  }

  async findOne(id: String): Promise<Menu> {
    const menu = await this.menuRepository.findOne({where:{id}});
    if (!menu) {
      throw new NotFoundException(`Menu item with id #${id} not found`);
    }
    return menu;
  }

  async update(id: String, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const existingMenu = await this.menuRepository.findOne({where:{id}});
    if (!existingMenu) {
      throw new NotFoundException(`Menu item with id #${id} not found`);
    }
    Object.assign(existingMenu, updateMenuDto);
    return this.menuRepository.save(existingMenu);
  }

  async remove(id: String) {
    const result = await this.menuRepository.delete(+id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu item with id #${id} not found`);
    }
  }

  async findByCategory(category: string): Promise<Menu[]> {
    const menus = await this.menuRepository.find({ where: { category } });
    if (!menus.length) {
      throw new NotFoundException(`No menu items found in category ${category}`);
    }
    return menus;
  }
}
