'use client';

import { useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/app/components/adminlayout';

// Calendar event interface
interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'order' | 'product' | 'restock' | 'payment' | 'meeting';
  details?: string;
}

export default function AdminCalendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Mock calendar events
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Pengiriman Batch #1', date: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-05`, time: '09:00', type: 'order', details: 'Pengiriman 25 produk ke distributor Jakarta' },
    { id: 2, title: 'Rilis Produk Baru', date: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-12`, time: '10:00', type: 'product', details: 'Mukena Bali Premium Edisi Terbatas' },
    { id: 3, title: 'Restock Produk', date: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-15`, time: '14:00', type: 'restock', details: 'Restock 50 pcs Mukena Travel Compact' },
    { id: 4, title: 'Meeting dengan Supplier', date: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-18`, time: '13:00', type: 'meeting', details: 'Diskusi bahan baku untuk koleksi baru' },
    { id: 5, title: 'Pembayaran Supplier', date: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-20`, time: '11:00', type: 'payment', details: 'Pembayaran invoice BBS-2024-05' },
    { id: 6, title: 'Pengiriman Batch #2', date: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${selectedDate}`, time: '10:30', type: 'order', details: 'Pengiriman 15 produk ke distributor Bandung' },
    { id: 7, title: 'Photoshoot Produk', date: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${selectedDate}`, time: '14:00', type: 'product', details: 'Photoshoot produk baru untuk katalog online' },
  ]);

  // Generate calendar days for the selected month
  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    
    // Add empty cells for days from previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the current month
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const calendarDays = getDaysInMonth(selectedYear, selectedMonth);
  
  // Get month name
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Get events for selected date
  const getEventsForDate = (day: number | null) => {
    if (day === null) return [];
    
    const dateString = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === dateString);
  };

  // Get events for selected date
  const selectedDateEvents = getEventsForDate(selectedDate);

  // Format event time
  const formatTime = (time: string) => {
    return time;
  };

  // Handler for day selection
  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      setSelectedDate(day);
    }
  };

  // Add new event handler
  const handleAddEvent = () => {
    const newEvent: CalendarEvent = {
      id: calendarEvents.length + 1,
      title: 'Event Baru',
      date: `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`,
      time: '09:00',
      type: 'meeting',
      details: 'Detail event baru'
    };
    
    setCalendarEvents([...calendarEvents, newEvent]);
  };

  // Get background color based on event type
  const getEventBackground = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-[#f5f0e4] text-[#9c8a63]';
      case 'product':
        return 'bg-[#e8e2d3] text-[#9c8a63]';
      case 'restock':
        return 'bg-[#e0d9c5] text-[#9c8a63]';
      case 'payment':
        return 'bg-[#d8d0b8] text-[#9c8a63]';
      case 'meeting':
        return 'bg-[#d4c9a8] text-[#9c8a63]';
      default:
        return 'bg-[#f5f0e4] text-[#9c8a63]';
    }
  };

  // Get icon based on event type
  const getEventIcon = (type: string) => {
    return (
      <div className="flex-shrink-0 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
          {type === 'product' && (
            <>
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </>
          )}
          {type === 'order' && (
            <>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </>
          )}
          {type === 'restock' && (
            <>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </>
          )}
          {type === 'payment' && (
            <>
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </>
          )}
          {type === 'meeting' && (
            <>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </>
          )}
        </svg>
      </div>
    );
  };

  return (
    <AdminLayout>
      <Head>
        <title>Kalender Admin | Kenzi</title>
      </Head>

      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Kalender Kenzi Attire</h1>
          <div className="text-sm text-black font-medium">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</div>
        </div>

        {/* Calendar Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-[#f5f0e4] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-black">{monthNames[selectedMonth]} {selectedYear}</h2>
            <button 
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-[#f5f0e4] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="flex gap-2">
            <div className="bg-white rounded-lg shadow-sm border border-[#f5f0e4] inline-flex">
              <button 
                onClick={() => setViewMode('month')} 
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'month' ? 'bg-[#f5f0e4] text-[#9c8a63]' : 'text-black hover:bg-[#f8f7f4]'} rounded-l-lg transition-colors`}
              >
                Bulan
              </button>
              <button 
                onClick={() => setViewMode('week')} 
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'week' ? 'bg-[#f5f0e4] text-[#9c8a63]' : 'text-black hover:bg-[#f8f7f4]'} transition-colors`}
              >
                Minggu
              </button>
              <button 
                onClick={() => setViewMode('day')} 
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'day' ? 'bg-[#f5f0e4] text-[#9c8a63]' : 'text-black hover:bg-[#f8f7f4]'} rounded-r-lg transition-colors`}
              >
                Hari
              </button>
            </div>
            
            <button 
              onClick={handleAddEvent}
              className="flex items-center gap-2 px-4 py-2 bg-[#9c8a63] hover:bg-[#8a7853] text-white rounded-lg shadow-sm transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="text-sm font-medium">Tambah Event</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-xl overflow-hidden">
            {viewMode === 'month' && (
              <>
                {/* Weekday Header */}
                <div className="grid grid-cols-7 bg-[#f5f0e4] text-[#9c8a63] font-medium">
                  <div className="py-3 text-center">Min</div>
                  <div className="py-3 text-center">Sen</div>
                  <div className="py-3 text-center">Sel</div>
                  <div className="py-3 text-center">Rab</div>
                  <div className="py-3 text-center">Kam</div>
                  <div className="py-3 text-center">Jum</div>
                  <div className="py-3 text-center">Sab</div>
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 border-t border-[#f5f0e4]">
                  {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const isCurrentDay = day === new Date().getDate() && currentMonth === selectedMonth && currentYear === selectedYear;
                    const isSelected = day === selectedDate;
                    
                    return (
                      <div 
                        key={index} 
                        className={`min-h-28 p-2 border-b border-r border-[#f5f0e4] ${day === null ? 'bg-[#fafafa]' : 'hover:bg-[#f8f7f4] cursor-pointer'} ${isCurrentDay ? 'bg-[#f8f7f4]' : ''} ${isSelected ? 'bg-[#f5f0e4]' : ''}`}
                        onClick={() => handleDayClick(day)}
                      >
                        {day !== null && (
                          <>
                            <div className={`text-right mb-1 ${isCurrentDay ? 'font-bold' : ''}`}>
                              <span className={`inline-block w-6 h-6 rounded-full text-center leading-6 ${isCurrentDay ? 'bg-[#9c8a63] text-white' : ''}`}>
                                {day}
                              </span>
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map(event => (
                                <div key={event.id} className={`text-xs p-1 rounded truncate ${getEventBackground(event.type)}`}>
                                  {event.time} {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-[#9c8a63] font-medium">
                                  + {dayEvents.length - 2} lainnya
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {viewMode === 'week' && (
              <div className="p-4">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {Array.from({ length: 7 }).map((_, index) => {
                    const day = new Date(selectedYear, selectedMonth, selectedDate - (selectedDate % 7) + index + 1);
                    const isCurrentDay = day.getDate() === new Date().getDate() && 
                                         day.getMonth() === new Date().getMonth() && 
                                         day.getFullYear() === new Date().getFullYear();
                    
                    return (
                      <div key={index} className="text-center">
                        <div className="text-xs text-black mb-1">
                          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][day.getDay()]}
                        </div>
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${isCurrentDay ? 'bg-[#9c8a63] text-white' : 'text-black'}`}>
                          {day.getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-2">
                  {Array.from({ length: 12 }).map((_, index) => {
                    const hour = 8 + index;
                    
                    return (
                      <div key={index} className="grid grid-cols-7 gap-2">
                        <div className="text-xs text-black font-medium col-span-1 pt-2">
                          {hour}:00
                        </div>
                        <div className="col-span-6 grid grid-cols-6 gap-2 min-h-14 border-t border-[#f5f0e4]">
                          {/* Events would go here */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {viewMode === 'day' && (
              <div className="p-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#9c8a63] text-white font-medium mb-1">
                    {selectedDate}
                  </div>
                  <div className="text-sm text-black">
                    {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][new Date(selectedYear, selectedMonth, selectedDate).getDay()]}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {Array.from({ length: 14 }).map((_, index) => {
                    const hour = 7 + index;
                    const timeEvents = selectedDateEvents.filter(e => parseInt(e.time.split(':')[0]) === hour);
                    
                    return (
                      <div key={index} className="flex">
                        <div className="w-16 text-right text-sm text-black pr-4 pt-2 font-medium">
                          {hour}:00
                        </div>
                        <div className="flex-1 min-h-16 border-t border-[#f5f0e4] relative">
                          {timeEvents.map(event => (
                            <div 
                              key={event.id} 
                              className={`absolute top-0 left-0 right-0 m-1 p-2 rounded-lg shadow-sm ${getEventBackground(event.type)}`}
                            >
                              <div className="flex items-start">
                                {getEventIcon(event.type)}
                                <div>
                                  <div className="font-medium text-sm">{event.title}</div>
                                  <div className="text-xs opacity-80">{event.time}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="col-span-1 bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Event Terjadwal</h3>
              <div className="text-sm text-black">
                {selectedDate} {monthNames[selectedMonth]} {selectedYear}
              </div>
            </div>

            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className={`p-4 rounded-lg ${getEventBackground(event.type)} relative`}>
                    <div className="absolute top-0 right-0 p-2 flex gap-1">
                      <button className="w-6 h-6 rounded-full bg-white text-[#9c8a63] hover:bg-[#f8f7f4] flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </button>
                      <button className="w-6 h-6 rounded-full bg-white text-[#9c8a63] hover:bg-[#f8f7f4] flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-start mb-3">
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-black mb-1">{event.title}</h4>
                        <div className="flex items-center text-xs text-black opacity-80">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {formatTime(event.time)}
                        </div>
                      </div>
                    </div>
                    {event.details && (
                      <p className="text-sm text-black opacity-90 mt-2">{event.details}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="p-4 rounded-full bg-[#f5f0e4] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8a63]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h4 className="font-medium text-black mb-2">Tidak Ada Event</h4>
                <p className="text-sm text-black opacity-70 mb-4">Tidak ada event terjadwal untuk tanggal ini</p>
                <button 
                  onClick={handleAddEvent}
                  className="flex items-center gap-2 px-4 py-2 bg-[#9c8a63] hover:bg-[#8a7853] text-white rounded-lg shadow-sm transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span className="text-sm font-medium">Tambah Event</span>
                </button>
              </div>
            )}

            {/* Upcoming Events */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-black mb-4">Event Mendatang</h3>
              <div className="space-y-3">
                {calendarEvents
                  .filter(event => {
                    const eventDate = new Date(event.date);
                    const today = new Date();
                    return eventDate >= today && !(eventDate.getDate() === selectedDate && 
                                                 eventDate.getMonth() === selectedMonth && 
                                                 eventDate.getFullYear() === selectedYear);
                  })
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 3)
                  .map(event => (
                    <div key={event.id} className="flex items-center p-3 hover:bg-[#f8f7f4] rounded-lg transition-colors">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${getEventBackground(event.type)}`}>
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-black">{event.title}</h4>
                        <div className="text-xs text-black opacity-70">
                          {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} • {event.time}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}