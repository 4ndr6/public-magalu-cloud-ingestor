import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Pulse } from '@prisma/client';
import { CreatePulseDTO } from './dto/create-pulse.dto';
import { PulseService } from './pulse.service';

@Controller('pulses')
export class PulseController {
  constructor(private readonly pulseService: PulseService) {}

  async toKB(usedAmount: string, useUnity: string) {
    try {
      BigInt(usedAmount);
    } catch {
      throw new HttpException(`Invalid usedAmount: ${usedAmount}`, HttpStatus.BAD_REQUEST);
    }
    type Unit = 'KB' | 'MB' | 'GB' | 'TB' | 'KBPS' | 'MBPS' | 'GBPS' | 'TBPS';
    const map: Record<Unit, number> = {
      KB: 1, // menor unidade
      MB: 1024, // 1 (MB) = 1024 (kbytes)
      GB: 1048576, // 1 (GB) = 1024 * 1024 (kbytes)
      TB: 1073741824, // 1 (TB) = 1024 * 1024 * 1024 (kbytes)
      KBPS: 60, // Kilo Bytes por segundo
      MBPS: 61440, // Mega Bytes por segundo
      GBPS: 62914560, // Giga Bytes por segundo
      TBPS: 64424509440, // Tera Bytes por segundo
    };
    const kilobytes = map[useUnity.toUpperCase()];
    if (isNaN(kilobytes)) {
      throw new HttpException(`Invalid useUnity: ${useUnity}`, HttpStatus.BAD_REQUEST);
    }
    return BigInt(BigInt(kilobytes) * BigInt(usedAmount)).toString();
  }

  @Post()
  async create(
    @Body()
    createPulseDto: CreatePulseDTO,
  ): Promise<Pulse> {
    if (createPulseDto.useUnity !== 'KB') {
      const usedAmount = createPulseDto.usedAmount;
      const useUnity = createPulseDto.useUnity;
      createPulseDto.usedAmount = await this.toKB(usedAmount, useUnity);
      createPulseDto.useUnity = 'KB';
    }
    return this.pulseService.createOrUpdate(createPulseDto);
  }

  @Get()
  findAll(): Promise<Pulse[]> {
    return this.pulseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pulse | null> {
    return this.pulseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePulseDto: Partial<CreatePulseDTO>): Promise<Pulse> {
    return this.pulseService.update(id, updatePulseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Pulse> {
    return this.pulseService.remove(id);
  }
}
