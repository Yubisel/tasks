import { Model } from 'mongoose';

export abstract class BaseService<T, C, U> {
  abstract getModel(): Model<T>;

  async create(createDto: C): Promise<T> {
    return await this.getModel().create(createDto);
  }

  async findAll(): Promise<T[]> {
    return await this.getModel().find();
  }

  async findById(id: string): Promise<T> {
    return await this.getModel().findById(id);
  }

  async update(id: string, updateDto: U): Promise<T> {
    return await this.getModel().findByIdAndUpdate(id, updateDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.getModel().findByIdAndDelete(id);
  }
}
