// Test script สำหรับทดสอบการทำงานของ frontend
// ทดสอบการแสดงชื่อและ role จริงใน sidebar

const testFrontendIntegration = () => {
    console.log('🧪 Testing Frontend Integration...');
    
    // ตรวจสอบว่ามี AuthContext และ Sidebar components
    console.log('\n1. Checking component availability:');
    
    // ตรวจสอบ AuthContext
    try {
        const authContext = document.querySelector('[data-testid="auth-context"]');
        if (authContext) {
            console.log('✅ AuthContext component found');
        } else {
            console.log('⚠️ AuthContext component not found (may be normal)');
        }
    } catch (error) {
        console.log('⚠️ AuthContext check failed:', error.message);
    }
    
    // ตรวจสอบ Sidebar
    try {
        const sidebar = document.querySelector('.sidebar, [data-testid="sidebar"]');
        if (sidebar) {
            console.log('✅ Sidebar component found');
        } else {
            console.log('⚠️ Sidebar component not found');
        }
    } catch (error) {
        console.log('⚠️ Sidebar check failed:', error.message);
    }
    
    // ตรวจสอบการแสดงชื่อและ role
    console.log('\n2. Checking user profile display:');
    
    try {
        // ตรวจสอบชื่อผู้ใช้
        const userNameElements = document.querySelectorAll('[class*="text-sm"], [class*="font-normal"]');
        let userNameFound = false;
        
        userNameElements.forEach(element => {
            const text = element.textContent?.trim();
            if (text && (text.includes('สมมติ') || text.includes('Sommut') || text.includes('testuser'))) {
                console.log('✅ User name displayed:', text);
                userNameFound = true;
            }
        });
        
        if (!userNameFound) {
            console.log('⚠️ User name not found in expected format');
        }
        
        // ตรวจสอบ role
        const roleElements = document.querySelectorAll('[class*="text-xs"]');
        let roleFound = false;
        
        roleElements.forEach(element => {
            const text = element.textContent?.trim();
            if (text && (text.includes('นิสิต') || text.includes('Student') || text.includes('Admin'))) {
                console.log('✅ Role description displayed:', text);
                roleFound = true;
            }
        });
        
        if (!roleFound) {
            console.log('⚠️ Role description not found in expected format');
        }
        
    } catch (error) {
        console.log('❌ User profile check failed:', error.message);
    }
    
    // ตรวจสอบ loading state
    console.log('\n3. Checking loading states:');
    
    try {
        const loadingElements = document.querySelectorAll('[class*="spin"], [class*="loading"]');
        if (loadingElements.length > 0) {
            console.log('⚠️ Loading state detected:', loadingElements.length, 'elements');
        } else {
            console.log('✅ No loading state detected (data loaded)');
        }
    } catch (error) {
        console.log('⚠️ Loading state check failed:', error.message);
    }
    
    // ตรวจสอบ error state
    console.log('\n4. Checking error states:');
    
    try {
        const errorElements = document.querySelectorAll('[class*="error"], [class*="red"]');
        if (errorElements.length > 0) {
            console.log('⚠️ Error state detected:', errorElements.length, 'elements');
            errorElements.forEach((element, index) => {
                console.log(`  Error ${index + 1}:`, element.textContent?.trim());
            });
        } else {
            console.log('✅ No error state detected');
        }
    } catch (error) {
        console.log('⚠️ Error state check failed:', error.message);
    }
    
    // ตรวจสอบการเปลี่ยนภาษา
    console.log('\n5. Checking language switching:');
    
    try {
        const languageButtons = document.querySelectorAll('button, [role="button"]');
        let languageButtonFound = false;
        
        languageButtons.forEach(button => {
            const text = button.textContent?.trim();
            if (text && (text.includes('TH') || text.includes('EN') || text.includes('ภาษา'))) {
                console.log('✅ Language switch button found:', text);
                languageButtonFound = true;
            }
        });
        
        if (!languageButtonFound) {
            console.log('⚠️ Language switch button not found');
        }
    } catch (error) {
        console.log('⚠️ Language switch check failed:', error.message);
    }
    
    console.log('\n✅ Frontend integration test completed!');
};

// ฟังก์ชันสำหรับทดสอบการทำงานของ API calls
const testAPICalls = async () => {
    console.log('🧪 Testing API Calls...');
    
    try {
        // ทดสอบการเรียก current-user API
        console.log('\n1. Testing /api/auth/current-user:');
        
        const response = await fetch('/api/auth/current-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        console.log('Status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Response:', JSON.stringify(data, null, 2));
            
            // ตรวจสอบข้อมูลใหม่
            console.log('\n2. Checking new fields:');
            console.log('- fullNameTH:', data.fullNameTH);
            console.log('- fullNameEN:', data.fullNameEN);
            console.log('- roleDescriptionTH:', data.roleDescriptionTH);
            console.log('- roleDescriptionEN:', data.roleDescriptionEN);
            console.log('- studentCode:', data.studentCode);
            
        } else {
            console.log('❌ API Error:', await response.text());
        }
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
    }
};

// ฟังก์ชันสำหรับทดสอบการทำงานของ console logs
const testConsoleLogs = () => {
    console.log('🧪 Testing Console Logs...');
    
    // ตรวจสอบ console logs ที่เกี่ยวข้องกับ AuthContext
    const originalLog = console.log;
    const logs: string[] = [];
    
    console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog(...args);
    };
    
    // รอสักครู่เพื่อให้ logs ถูกเก็บ
    setTimeout(() => {
        console.log = originalLog;
        
        console.log('\n📋 Console logs captured:');
        logs.forEach((log, index) => {
            if (log.includes('🔍') || log.includes('✅') || log.includes('❌') || log.includes('🔐')) {
                console.log(`  ${index + 1}. ${log}`);
            }
        });
        
        console.log('\n✅ Console logs test completed!');
    }, 2000);
};

// รันการทดสอบทั้งหมด
const runAllTests = async () => {
    console.log('🚀 Starting Frontend Integration Tests...');
    
    // รันการทดสอบตามลำดับ
    testFrontendIntegration();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testAPICalls();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    testConsoleLogs();
    
    console.log('\n🎉 All tests completed!');
};

// Export functions สำหรับการใช้งาน
if (typeof window !== 'undefined') {
    // ใน browser environment
    window.testFrontendIntegration = testFrontendIntegration;
    window.testAPICalls = testAPICalls;
    window.testConsoleLogs = testConsoleLogs;
    window.runAllTests = runAllTests;
    
    console.log('🧪 Frontend test functions available:');
    console.log('- testFrontendIntegration()');
    console.log('- testAPICalls()');
    console.log('- testConsoleLogs()');
    console.log('- runAllTests()');
}

// รันการทดสอบอัตโนมัติถ้าเรียกใช้โดยตรง
if (require.main === module) {
    runAllTests();
}

module.exports = {
    testFrontendIntegration,
    testAPICalls,
    testConsoleLogs,
    runAllTests
};
