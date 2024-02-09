document.addEventListener('DOMContentLoaded', function () {
  const ownerCardContainer = document.getElementById('ownerCardContainer');

  //신청한 유저들 목록 조회
  function fetchPreOwners() {
    axios
      .get('applyowner')
      .then(function (response) {
        const preOwners = response.data;
        console.log('response.data', response.data);
        preOwners.forEach(function (preOwner, index) {
          // Create <div> for each owner card
          const ownerCardCol = document.createElement('div');
          ownerCardCol.className = 'row'; // Add 'col' class

          const ownerCard = document.createElement('div');
          ownerCard.className = 'boardcontain ownercard';
          ownerCard.id = `ownerCard_${index}`;

          // Create <span> elements for each property
          const ownerNameSpan = document.createElement('span');
          ownerNameSpan.innerHTML = `<b>대표자:</b> ${preOwner.owner_name}<br>`;
          ownerCard.appendChild(ownerNameSpan);

          const businessLicenseNumberSpan = document.createElement('span');
          businessLicenseNumberSpan.innerHTML = `<b>사업자등록증번호:</b> ${preOwner.business_license_number}<br>`;
          ownerCard.appendChild(businessLicenseNumberSpan);

          const stortitleSpan = document.createElement('span');
          stortitleSpan.innerHTML = `<b>지점명:</b> ${preOwner.store_name}<br>`;
          ownerCard.appendChild(stortitleSpan);

          const businessLocationSpan = document.createElement('span');
          businessLocationSpan.innerHTML = `<b>사업장 소재지:</b> ${preOwner.business_location}`;
          ownerCard.appendChild(businessLocationSpan);

          const approveButton = document.createElement('button');
          approveButton.textContent = '승인';
          approveButton.classList.add('approve-button'); // 추가된 부분
          approveButton.classList.add('btn'); // 추가된 부분
          approveButton.classList.add('btn-outline-secondary'); // 추가된 부분
          approveButton.addEventListener('click', function () {
            approveOwner(preOwner.userid, preOwner.id);
          });

          // Append the button to the card
          ownerCard.appendChild(approveButton);

          // Append the card to the container
          ownerCardContainer.appendChild(ownerCard);
        });
      })
      .catch(function (error) {
        console.error('Error fetching pre-owners', error);
      });
  }

  //   function fetchPreOwners() {
  //     axios
  //       .get('applyowner')
  //       .then(function (response) {
  //         const preOwners = response.data;

  //         // Display pre-owners
  //         preOwners.forEach((preOwner) => {
  //           const ownerCard = document.createElement('div');
  //           ownerCard.classList.add('col');
  //           ownerCard.innerHTML += `
  //               <div class="boardcontain">
  //                 <strong>대표자: ${preOwner.owner_name}</strong><br>
  //                 <strong>지점명: ${preOwner.store_name}</strong><br>
  //                 <strong>지점 장소: ${preOwner.business_location}</strong><br>
  //                 <strong>사업자 등록증 번호: ${preOwner.business_license_number}</strong><br>
  //                 <div class="text-end">
  //                   <button type="button" class="btn" onclick="approveOwner(${preOwner.userId}, ${preOwner.id})">승인하기</button>
  //                 </div>
  //               </div>
  //             `;

  //           ownerCardContainer.appendChild(ownerCard);
  //         });
  //       })
  //       .catch(function (error) {
  //         console.error('Error fetching pre-owners', error);
  //       });
  //   }

  //유저 지점사장님으로 승인
  function approveOwner(userid, applyownerid) {
    axios
      .put(`applyowner/${userid}/${applyownerid}`)
      .then(function () {
        alert('승인이 완료되었습니다.');

        // 승인 완료 후 새로고침
        ownerCardContainer.innerHTML = '';
        fetchPreOwners();
      })
      .catch(function (error) {
        console.error('Error approving owner', error);
      });
  }

  fetchPreOwners();
});
