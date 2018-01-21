using Microsoft.VisualStudio.TestTools.UnitTesting;
using AutoMapperDemoTest.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapperDemoTest.Model;

namespace AutoMapperDemoTests
{
    [TestClass()]
    public class AutoMapperDemoTest
    {
        [TestMethod()]
        public void AddressMapperTest()
        {
            Mapper.Initialize(p =>
            {
                p.CreateMap<AddressDto, Address>();
            });

            AddressDto dto = new AddressDto
            {
                Country = "China",
                City = "Beijing",
                Street = "Dongzhimen Street",
                PostCode = "100001"
            };

            Address address = Mapper.Map<AddressDto, Address>(dto);
            Assert.AreEqual("China",address.Country);
            Assert.AreEqual("Beijing",address.City);
            Assert.AreEqual("Dongzhimen Street",address.Street);
            Assert.AreEqual(address.PostCode, "100001");
        }

        [TestMethod()]
        public void BookStoreMapperTest()
        {
            Mapper.Initialize(p =>
            {
                p.CreateMap<BookDto, Book>();
                p.CreateMap<AddressDto, Address>();
                p.CreateMap<BookStoreDto, BookStore>();
            });

            BookStoreDto dto = new BookStoreDto
            {
                Name = "My Store",
                Address = new AddressDto
                {
                    City = "Beijing"
                },
                Books = new List<BookDto>
                {
                    new BookDto {Title = "RESTful Web Service"},
                    new BookDto {Title = "Ruby for Rails"},
                }
            };

            BookStore bookStore = Mapper.Map<BookStoreDto, BookStore>(dto);

        }

        [TestMethod()]
        public void BookMapperTest()
        {
            Mapper.Initialize(p =>
            {
                p.CreateMap<BookDto, Book>()
                    .ForMember(bok => bok.Publisher, (map) => map.MapFrom(dto => new Publisher() {Name = dto.Publisher}));
            });
            //Mapper.AssertConfigurationIsValid();//用于检查还有哪些规则没有写完
            BookDto bookdto = new BookDto()
            {
                Publisher = "wxz"
            };
            Book book = Mapper.Map<BookDto, Book>(bookdto);
        }
    }

}